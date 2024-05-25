import { Product } from '../utilities/interfaces.utility';
import axios from '../utilities/axios.utility';

export const createProduct = async (product: Product) => await axios.post('/product/create', product);

export const getAllProductsRequest = async () => await axios.get('/products');