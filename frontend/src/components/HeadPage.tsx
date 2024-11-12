import { ButtonBack } from './ui/ButtonBack';
import MyIconProfile from './ui/MyIconProfile';

const HeadPage = ({ namePage }: { namePage: string }) => {
  return (
    <header className="w-full px-4 flex justify-between ">
      <div className="flex">
        <ButtonBack className="mt-4" />
        <h1 className="text-3xl font-bold mb-8 text-white ml-4 mt-4 no-drag no-select">{namePage}</h1>
      </div>
      <MyIconProfile className="mt-3 bg-white w-11 h-11 rounded-full no-select no-drag" />
    </header>
  );
};

export default HeadPage;
