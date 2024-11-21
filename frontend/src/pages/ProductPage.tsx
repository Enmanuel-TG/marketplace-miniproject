import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import PhotoProduct from '../components/PhotoProduct';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import Button from '@/components/ui/Button';
import Input from '../components/ui/Input';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { toastifyConfig } from '@/utilities/toastify.utility';
import HeadPage from '@/components/HeadPage';

export const ProductPage = () => {
  const { register, handleSubmit } = useForm();
  const { getProduct, product, deleteProduct, updateStock } = useProduct();
  const { user, getDataUser, userData, isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const productID = id?.split(':')[1];
  const [productOwner, setProductOwner] = useState<boolean>(false);
  const navigate = useNavigate();

  const Edit = () => {
    navigate(`/update-product/:${productID}`);
  };
  const back = () => {
    navigate('/', { replace: true });
  };

  const ProductDelete = async () => {
    deleteProduct(productID as unknown as number);
    back();
  };

  const onSubmit = async (data: FieldValues) => {
    const res = await updateStock(parseInt(data.stock), productID as unknown as string);
    if (res === 200) {
      toast.success('Stock Updated', toastifyConfig);
    }
  };

  const markAsSold = async () => {
    const res = await updateStock(0, productID as unknown as string);
    if (res === 200) {
      toast.success('Marked as sold', toastifyConfig);
    }
  };

  useEffect(() => {
    if (product) {
      getDataUser(product.userId);
    }
  }, [product]);

  useEffect(() => {
    if (productID) {
      getProduct(Number(productID));
    }
  }, [productID]);

  useEffect(() => {
    if (!user) return;
    setProductOwner(user.id === product.userId);
  }, [user, product]);

  const userProfile = () => {
    navigate(`/user-Profile/id:${product.userId}`);
  };

  if (!product) {
    return (
      <div className="flex flex-row items-center justify-center min-h-screen bg-background p-4">
        This Product Does Not Exist
        <button className="ml-4 border border-gray-500 px-3 py-1 rounded" onClick={back}>
          back
        </button>
      </div>
    );
  }
  if (!product.photos) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">Loading...</div>;
  }
  return (
    <div className="bg-background">
      <HeadPage namePage={'Product Page'} />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="shadow-2xl rounded-lg max-w-5xl w-full overflow-hidden px-6 pb-4">
          <div className="h-96 w-full mt-4 sm:mt-10 flex items-center justify-center">
            <PhotoProduct images={product.photos as unknown as string[]} />
          </div>
          <div className="my-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {/* Product Name and Price */}
            <div className="flex flex-row sm:flex-row sm:items-center">
              <h1 className="text-3xl font-bold mr-4  truncate">{product.name}</h1>
              <span className="text-3xl text-green-600 font-semibold">${product.price}</span>
            </div>

            {/* Seller Information or Admin Options */}
            <div className="mt-4 sm:mt-0">
              {productOwner || user?.role === 'admin' ? (
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                  <Dialog>
                    <DialogTrigger className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                      Delete
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <br />
                        <DialogDescription>
                          <p>
                            This action cannot be undone. This will permanently delete this product and remove the data
                            from our servers.
                          </p>
                          <DialogClose className="w-full flex justify-center">
                            <Button
                              fieldname="Delete"
                              styles="p-2 w-1/6 mt-6 hover:bg-red-600 bg-red-500 text-white rounded-lg"
                              onClick={ProductDelete}
                            />
                          </DialogClose>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Button
                    styles="bg-green-500 py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={Edit}
                    fieldname="Edit"
                  />
                </div>
              ) : (
                <div className="flex flex-row gap-3">
                  <img
                    src={userData?.photo}
                    onClick={userProfile}
                    className="w-10 h-10 rounded-full object-cover"
                    alt="Seller"
                  />
                  <div className="flex flex-row gap-2 items-center">
                    <p className="text-sm font-semibold">Seller:</p>
                    <p className="cursor-pointer font-medium text-sm" onClick={userProfile}>
                      {userData?.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            {user?.role === 'admin' && !productOwner && (
              <div className="flex items-center">
                <img src={userData?.photo} onClick={userProfile} className="w-10 h-10 rounded-full mr-2" />
                <div className="flex flex-row">
                  <p className="pr-2 cursor-pointer">Seller:</p>
                  <div className="cursor-pointer" onClick={userProfile}>
                    {userData?.name}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mb-4 flex flex-col md:flex-row flex-wrap gap-x-8">
            <div>
              <p>
                <strong className="mr-2">Stock:</strong> {product.stock}
                {productOwner && (
                  <Dialog>
                    <DialogTrigger>
                      <img src="/edit.svg" className="w-3.5 h-3.5 ml-2" alt="Edit Stock" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Change Stock</DialogTitle>
                      <DialogDescription>
                        If you send 0, you will mark the product as sold, or out of stock,
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Input min={0} type="number" fieldname="Stock" {...register('stock', { required: true })} />
                          <Button type="submit" fieldname="Change" />
                        </form>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                )}
              </p>
            </div>
            <p className="capitalize">
              <strong className="mr-2">Location:</strong> {product.location}
            </p>
            <p className="capitalize">
              <strong className="mr-2">Category:</strong>
              {product.category}
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl pb-2 mb-2 font-semibold">Description</h2>
            <p className="">{product.description}</p>
          </div>
          {isAuthenticated ? (
            <div>
              {productOwner ? (
                <div>
                  <Button styles="bg-blue-500 px-4 py-2 rounded-md" fieldname="Mark as sold" onClick={markAsSold} />
                </div>
              ) : (
                <a
                  href={`https://wa.me/${userData?.phoneNumber}?text=I'm interested in ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto bg-green-500 py-2 my-4 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Contact me
                </a>
              )}
            </div>
          ) : (
            <div>You need to be logged in to contact me</div>
          )}
        </div>
      </div>
    </div>
  );
};
