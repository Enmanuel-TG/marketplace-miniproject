import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

const uploadImg = (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const file = req.files.photo as UploadedFile;
  const path = `${__dirname}/${file.name}`;
  file.mv(path, (err) => {
    if (err) return res.status(500).send('');

    return res.send('File uploaded!');
  });
  return file;
};
export default uploadImg;
//TODO where the photo will go
