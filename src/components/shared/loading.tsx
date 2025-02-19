import ProgressBar from '@badrap/bar-of-progress';
import classNames from 'classnames';
import { ImSpinner2 } from 'react-icons/im';

export const LoadingBanner = () => {
  return (
    <div className="relative h-[396px] md:h-[430px] min-h-[396px] md:min-h-[430px] 2xl:h-[620px] 2xl:min-h-[620px] bg-black overflow-hidden w-full flex justify-center items-center mt-2">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="pl-[4%] md:pl-0 w-[80%] md:w-[40%] h-[396px] md:h-[430px] min-h-[396px] md:min-h-[430px] 2xl:h-[620px] 2xl:min-h-[620px] animate-pulse flex flex-col justify-center">
          <div className="mt-2 w-[60%] h-[30px] md:h-[60px] bg-[#141313] rounded-lg"></div>
          <div className="mt-2 w-full h-[28px] md:h-[64px] bg-[#141313] rounded-lg "></div>
          <div className="hidden md:block mt-2 w-[80%] bg-black h-4 bg-[#141313] rounded-lg"></div>
          <div className="flex gap-2">
            <div className="mt-2 w-[135px] h-[45px] bg-[#141313] rounded-lg"></div>
            <div className="mt-2 w-[135px] h-[45px] bg-[#141313] rounded-lg"></div>
          </div>
        </div>
        <div className="absolute md:relative w-full animate-pulse h-full md:h-[305px] w-full md:w-[60%] bg-[#111] md:bg-[#141313] rounded-lg"></div>
      </div>
    </div>
  );
};

export const LoadingVideo = ({ classname }: { classname: string }) => {
  return (
    <div className="flex flex-col col-start-1 col-end-6 md:col-start-2 md:col-end-6 w-full justify-center items-center h-[394px] md:h-[550px] min-h-[394px] md:min-h-[550px]">
      <div className="w-full flex justify-center items-center">
        <ImSpinner2
          className={classNames('animate-spin text-white', classname)}
        />
      </div>
    </div>
  );
};

const progressBar = new ProgressBar({
  size: 4,
  color: '#6a55fa',
  className: 'z-50',
  delay: 100,
});

export default progressBar;
