import { Request, Response } from 'express';
import fs from 'fs';
import winston from 'winston';
import { FixMeLater } from '..';
import { config } from '../startup/config';

const { imageAssetsPath } = config;

export const getProfileImage: FixMeLater = (req: Request, res: Response) => {
  const { handle } = req.params;

  fs.readdir(`${imageAssetsPath}`, (err, files) => {
    if (err) {
      winston.error(err);
      res.status(500).send('');
    } else {
      let fileName = files.find((file) => file.split('.')[0] === handle);
      fileName = fileName || 'default.svg';

      res.sendFile(`${imageAssetsPath}${fileName}`);
    }
  });
};

export const getBannerImage: FixMeLater = (req: Request, res: Response) => {
  const { handle } = req.params;

  fs.readdir(`${imageAssetsPath}`, (err, files) => {
    if (err) {
      winston.error(err);
      res.status(500).send('');
    } else {
      let fileName = files.find((file) => file.split('.')[0] === `${handle}-banner`);
      fileName = fileName || 'default-banner.jpg';

      res.sendFile(`${imageAssetsPath}${fileName}`);
    }
  });
};
