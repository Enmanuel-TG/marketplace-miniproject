import { Product } from '../utilities/interfaces.utility';
import { server } from '../utilities/axios.utility';

export const createProductRequest = async (product: Product) => {
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price);
  formData.append('description', product.description);
  formData.append('location', product.location);
  formData.append('state', product.state);
  formData.append('category', product.category);
  formData.append('stock', product.stock);
  product.photos.forEach((photo) => {
    formData.append('photos', photo);
  });
  return await server.post('/product/create', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
};
export const getAllProductsRequest = async () => await server.get('/product/allProduct');
export const getProductRequest = async (id: number) => await server.get(`/product/product/${id}`);
export const searchProductRequest = async (name: string) => {return await server.post('/product/search',{ name });
};