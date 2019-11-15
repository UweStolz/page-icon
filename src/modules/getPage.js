const axios = require('axios');

function getPage(pageUrl) {
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

module.exports = getPage;
