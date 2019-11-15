import 'source-map-support/register';

import url from 'url';
import getPage from './modules/getPage';
import getIconLinks from './modules/getIconLinks';
import downloadIcons from './modules/download/downloadIcons';
import findBestIcon from './modules/findBestIcon';

function isHttps(pageUrl) {
  return url.parse(pageUrl).protocol === 'https:';
}

function makeHttps(pageUrl) {
  const parsed = url.parse(pageUrl);
  parsed.protocol = 'https:';
  return url.format(parsed);
}

export default function main(pageUrl, options = {}) {
  const bestWithPref = (icons) => findBestIcon(icons, options.ext);

  return getPage(pageUrl)
    .then((dom) => getIconLinks(pageUrl, dom))
    .then(downloadIcons)
    .then(bestWithPref)
    .then((result) => {
      if (result || isHttps(pageUrl)) {
        return result;
      }

      const httpsUrl = makeHttps(pageUrl);
      return main(httpsUrl, options);
    });
}
