const fs = require('fs');
const winston = require('winston');
const { imageAssetsPath } = require('../../startup/config');


function getProfileImage(req, res) {
  const { handle } = req.params;

  fs.readdir(`${imageAssetsPath}`, (err, files) => {
    if (err) {
      winston.error(err);
      res.status(500).send('');
    } else {
      let fileName = files.find(file => file.split('.')[0] === handle);
      fileName = fileName ? fileName : 'default.svg'

      res.sendFile(`${imageAssetsPath}${fileName}`);
    }
  });
}


function getBannerImage(req, res) {
  const { handle } = req.params;

  fs.readdir(`${imageAssetsPath}`, (err, files) => {
    if (err) {
      winston.error(err);
      res.status(500).send('');
    } else {
      let fileName = files.find(file => file.split('.')[0] === `${handle}-banner`);
      fileName = fileName ? fileName : 'default-banner.jpg'

      res.sendFile(`${imageAssetsPath}${fileName}`);
    }
  });
}

module.exports = {
  getProfileImage,
  getBannerImage,
}