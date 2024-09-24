import { server } from '../utilities/axios.utility';

export const getRating = (sellerId: number) => { return server.post('/rating/', { sellerId });};
