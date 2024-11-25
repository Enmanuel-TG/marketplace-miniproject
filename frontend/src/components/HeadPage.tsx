import { cn } from '@/lib/utils';
import { ButtonBack } from './ui/ButtonBack';
import MyIconProfile from './ui/MyIconProfile';
import Logout from '@/components/Logout';
import HomeMenu from './HomeMenu';

const HeadPage = ({ namePage, isHome = false }: { namePage: string; isHome?: boolean }) => {
  return (
    <>
      <header className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <ButtonBack className={('mt-4', isHome && 'hidden')} />
          <h1 className="flex text-base md:text-3xl font-bold ml-1 md:ml-4">{namePage}</h1>
        </div>
        <div className="flex items-center justify-center mt-3">
          <Logout />
          <MyIconProfile className="bg-white size-11 rounded-full" />
        </div>
      </header>
      <div className="fixed bottom-10 bg-white right-4 z-10 pt-3 pb-11 rounded-full shadow-md transition-opacity duration-300 max-w-[65px]">
        <HomeMenu />
      </div>
    </>
  );
};

export default HeadPage;
