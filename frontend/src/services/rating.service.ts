import { server } from '../utilities/axios.utility';

export const getRating = (sellerId: number) => {
  return server.post('/rating/', { sellerId });
};
export const createOrUpdateRating = (sellerId: number, data: number) => {
  const rate = Number(data);
  return server.put('/rating/', { sellerId, rate });
};
