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
import HeadPage from '@/components/HeadPage';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signUp, isAuthenticated, errors: registerErrors, registerWithGoogle, setErrors } = useAuth();
  const { handleSubmit, register } = useForm<DataAccount>();
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setErrors([]);
      isFirstRender.current = false;
      return;
    }
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error, toastifyConfig));
    }
  }, [registerErrors]);

  const setData = (data: DataAccount) => {
    signUp(data);
  };

  return (
    <div>
      <HeadPage namePage="Register" />
      <div className="m-auto">
        <div className="w-full max-w-md mx-auto my-28">
          <Slider ref={sliderRef} {...formSliderSettings}>
            <div>
              <form>
                <Input
                  fieldname="First Name"
                  required
                  type="text"
                  {...register('firstName', { required: true })}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  fieldname="Last Name"
                  required
                  type="text"
                  {...register('lastName', { required: true })}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <Button
                    styles="px-3 py-2"
                    fieldname="Next"
                    type="button"
                    onClick={() => sliderRef.current?.slickNext()}
                  />
                </div>
              </form>
            </div>
            <div>
              <form>
                <Input
                  fieldname="Date of Birth"
                  required
                  type="date"
                  {...register('birthday', { required: true })}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  fieldname="Phone Number"
                  type="tel"
                  required
                  {...register('phoneNumber', { required: true })}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between">
                  <Button
                    fieldname="Back"
                    type="button"
                    styles="px-3 py-2"
                    onClick={() => sliderRef.current?.slickPrev()}
                  />
                  <Button
                    fieldname="Next"
                    type="button"
                    styles="px-3 py-2"
                    onClick={() => sliderRef.current?.slickNext()}
                  />
                </div>
              </form>
            </div>
            <div>
              <form onSubmit={handleSubmit(setData)}>
                <Input
                  fieldname="Email"
                  required
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Input
                  fieldname="Password"
                  required
                  type="password"
                  {...register('password', { required: true })}
                  className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between ">
                  <Button
                    fieldname="Back"
                    type="button"
                    styles="px-3 py-2"
                    onClick={() => sliderRef.current?.slickPrev()}
                  />
                  <Button fieldname="Register" styles="px-3 py-2" type="submit" />
                </div>
              </form>
            </div>
          </Slider>

          <div className="flex items-center my-4 mt-5">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 rounded"
            onClick={registerWithGoogle}
          >
            Register with Google 🚀
          </button>

          <div className="mt-4 flex space-x-2">
            <h1>Already have an account?</h1>
            <Link className="text-blue-500 cursor-pointer hover:underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
