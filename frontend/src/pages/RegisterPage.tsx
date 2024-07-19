import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { DataAccount } from '../utilities/interfaces.utility';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import { formSliderSettings } from '../utilities/slick.utility';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp, isAuthenticated, errors: registerErrors, registerWithGoogle } = useAuth();
  const { handleSubmit, register } = useForm<DataAccount>();
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    registerErrors.map((error) => toast.error(error, toastifyConfig));
  }, [registerErrors]);

  const setData = (data: DataAccount) => {
    signUp(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">Register</h1>
        <Slider ref={sliderRef} {...formSliderSettings}>
          <div>
            <form>
              <Input
                fieldname="First Name"
                type="text"
                {...register('firstName', { required: true })}
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                fieldname="Last Name"
                type="text"
                {...register('lastName', { required: true })}
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end">
                <Button fieldname="Next" type="button" onClick={() => sliderRef.current?.slickNext()} />
              </div>
            </form>
          </div>
          <div>
            <form>
              <Input
                fieldname="Date of Birth"
                type="date"
                {...register('birthday', { required: true })}
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                fieldname="Phone Number"
                type="tel"
                {...register('phoneNumber', { required: true })}
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between">
                <Button fieldname="Back" type="button" onClick={() => sliderRef.current?.slickPrev()} />
                <Button fieldname="Next" type="button" onClick={() => sliderRef.current?.slickNext()} />
              </div>
            </form>
          </div>
          <div>
            <form onSubmit={handleSubmit(setData)}>
              <Input
                fieldname="Email"
                type="email"
                {...register('email', { required: true })}
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Input
                fieldname="Password"
                type="password"
                {...register('password', { required: true })}
                className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-between ">
                <Button fieldname="Back" type="button" onClick={() => sliderRef.current?.slickPrev()} />
                <Button fieldname="Register" type="submit" />
              </div>
            </form>
          </div>
        </Slider>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
          onClick={registerWithGoogle}
        >
          Register with Google 🚀
        </button>
        <div className="mt-4 text-center flex justify-center items-center space-x-2">
          <h1 className="text-gray-600">Already have an account?</h1>
          <Link className="text-blue-500 cursor-pointer hover:underline" to='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
