import axios from 'axios';

export default function getPage(pageUrl: string): Promise<string|Buffer> {
  return new Promise(((resolve, reject) => {
    axios.get(pageUrl)
      .then((response) => {
        resolve(response.data);
      })
      .catch((response) => {
        reject(response);
      });
  }));
}
