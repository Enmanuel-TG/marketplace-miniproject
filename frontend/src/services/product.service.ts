import { Product } from '../utilities/interfaces.utility';
import { server } from '../utilities/axios.utility';

export const createProductRequest = async (product: Product) => await server.post('/product/create', product);
export const getAllProductsRequest = async () => await server.get('/product/allProduct');
export const getProductRequest = async (id: number) => await server.get(`/product/product/${id}`);