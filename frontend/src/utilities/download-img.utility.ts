import { toastifyConfig } from '../utilities/toastify.utility';
import { toast } from 'react-toastify';

export const downloadImg = async (urls: string[]) => {
  try {
    const responses = await Promise.all(
      urls.map((url) => {
        return fetch(url);
      }),
    );
    const blobs = await Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.url}`);
        }
        return response.blob();
      }),
    );
    return blobs;
  } catch (error) {
    toast.error('Failed to download image', toastifyConfig);
  }
};
