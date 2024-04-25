import { Product } from '../utility/interfaces';
import axios from './axios';

export const createProduct = async (product: Product) => await axios.post('/product/create', product);