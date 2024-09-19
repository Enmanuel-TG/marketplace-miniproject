import { ButtonBack } from './ui/ButtonBack';
import MyIconProfile from './ui/MyIconProfile';

const HeadPage = ({ namePage }: { namePage: string }) => {
  return (
    <div>
      <header className="flex px-4 between">
        <div className="flex">
          <ButtonBack className="mt-4" />
          <h1 className="text-3xl font-bold mb-8 text-white ml-4 mt-4 no-drag no-select">{namePage}</h1>
        </div>
        <MyIconProfile className="mx-3 bg-white w-11 h-11 rounded-full no-select no-drag absolute right-5 top-5 shadow-lg" />
      </header>
    </div>
  );
};

export default HeadPage;
