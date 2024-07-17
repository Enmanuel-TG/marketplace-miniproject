import { Product } from '../utilities/interfaces.utility';
import { server } from '../utilities/axios.utility';

export const createProduct = async (product: Product) => await server.post('/product/create', product);
export const getAllProductsRequest = async () => await server.get('/product/allProduct');