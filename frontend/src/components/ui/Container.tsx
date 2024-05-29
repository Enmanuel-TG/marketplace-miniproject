import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return <div className="mx-auto max-w-3xl  h-screen my-4 px-4 border-solid border-2 border-black bg-white">{children}</div>;
};
export default Container;
