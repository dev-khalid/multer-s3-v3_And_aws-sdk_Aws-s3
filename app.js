const express = require('express');
const app = express();


/**
 * @All_ABOUT_AWS_S3_AND_MULTER_S3
 */
const { nanoid } = require('nanoid');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3-v3');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: '../config.env' });
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});
const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    ACL: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLocaleLowerCase()
          .split(' ')
          .join('-') + nanoid();
      cb(null, fileName + fileExt); //this name will be stored in s3 bucket
      // cb(null, Date.now().toString());
    },
    // throwMimeTypeConflictErrorIf: (contentType, mimeType, _file) =>
    //   ![mimeType, 'application/octet-stream'].includes(contentType),
  }),
});

app.get('/', (req, res, next) => {
  res.send('working well');
});
app.post('/', uploadS3.single('gallery'), (req, res, next) => {
  // console.log('all about request', req);

  console.log('😀😀all about response', req);
  res.json('got it');
});
module.exports = app;
