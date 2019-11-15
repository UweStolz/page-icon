import axios from 'axios';
import url from 'url';
import fileType from 'file-type';

// Unused!?
// function getExtension(downloadUrl) {
//   return downloadUrl.match(/\.(png|jpg|ico)/)[0];
// }

function getSiteDomain(siteUrl) {
  return url.parse(siteUrl).hostname;
}

export default function downloadIcon(iconUrl) {
  const iconData = new Promise(((resolve, reject) => {
    axios.get(iconUrl, {
      responseType: 'arraybuffer',
      // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.status === 404) {
          resolve();
          return;
        }
        reject(error);
      });
  }));

  return iconData.then((iconData) => {
    if (!iconData) {
      return;
    }

    const fileDetails = fileType(iconData);
    if (!fileDetails) {
      return null;
    }

    // add `.` to ext
    fileDetails.ext = `.${fileDetails.ext}`;

    return {
      source: iconUrl,
      name: getSiteDomain(iconUrl),
      data: iconData,
      size: iconData.length,
      ...fileDetails,
    };
  });
}
