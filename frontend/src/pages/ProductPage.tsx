import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import PhotoProduct from '../components/PhotoProduct';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MyIconProfile from '../components/ui/MyIconProfile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Button from '@/components/ui/Button';

export const ProductPage = () => {
  const { getProduct, product, deleteProduct } = useProduct();
  const { user, getDataUser, userData } = useAuth();
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
    setTimeout(() => {
      back();
    }, 2000);
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
    // user.role === 'admin'
    if (user.id === product.userId) {
      setProductOwner(true);
    }
  }, [user, product]);

  const userProfile = () => {
    navigate(`/user-Profile/id:${product.userId}`);
  };

  if (!product) {
    return (
      <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
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
    <Dialog>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <MyIconProfile className="mx-3 bg-white w-11 h-11 rounded-full no-select no-drag absolute right-5 top-5 shadow-lg" />
        <div className="shadow-lg rounded-lg max-w-5xl w-full overflow-hidden px-6 pb-4">
          <div className="h-96 w-full mt-10 flex items-center justify-center">
            <PhotoProduct images={product.photos as unknown as string[]} />
          </div>
          <div className="my-6 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-white mr-4 no-drag">{product.name}</h1>
              <span className="text-3xl text-green-600 font-semibold no-drag">${product.price}</span>
            </div>
            <div>
              {productOwner ? (
                <div>
                  <DialogTrigger className="bg-red-500 text-white mr-2 py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                    {' '}
                    Delete
                  </DialogTrigger>

                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={Edit}
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <img src={userData?.photo} onClick={userProfile} className="w-10 h-10 rounded-full mr-2" />
                  <div className="flex flex-row">
                    <p className="text-gray-500 pr-2 cursor-pointer">Seller:</p>
                    <div className="cursor-pointer" onClick={userProfile}>
                      {userData?.name}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl text-white pb-2 mb-2 font-semibold no-drag no-select">Description</h2>
            <p className="text-gray-300">{product.description}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-300">
              <strong className="mr-2 text-white no-drag no-select">Location:</strong> {product.location}
            </p>
            <p className="text-gray-300">
              <strong className="mr-2 text-white no-drag no-select">Stock:</strong> {product.stock}
            </p>
          </div>
          <a
            href={`https://wa.me/?text=I'm interested in ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto bg-green-500 text-white py-2 my-4 px-4 rounded-lg hover:bg-green-600 transition-colors no-select no-drag"
          >
            Contact me
          </a>
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this product and remove the data from our
            servers.
            <Button fieldname="Delete" onClick={ProductDelete} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
