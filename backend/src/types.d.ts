import { Request } from 'express';

export interface ExtendedRequest extends Request {
  userId?: number;
}

export interface CloudinaryUploadResponse {
  url: string;
  id: string;
}
