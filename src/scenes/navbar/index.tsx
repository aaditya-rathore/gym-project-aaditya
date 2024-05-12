import { Dispatch, SetStateAction, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Logo from '@/assets/Logo.png';
import Link from './Link';
import { SelectedPage } from '@/shared/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import ActionButton from '@/shared/ActionButton';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';
import supabase from '../supabase';

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  setShowModal: (value: boolean) => void;
  appDetails: Session | null;
  setAuthDetails: Dispatch<SetStateAction<Session | null>>;
};

const Navbar = ({
  isTopOfPage,
  selectedPage,
  setSelectedPage,
  setShowModal,
  appDetails,
  setAuthDetails,
}: Props) => {
  const flexBetween = 'flex items-center justify-between';
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const navbarBackground = isTopOfPage ? '' : 'bg-primary-100 drop-shadow';
  const { user } = appDetails || {};
  const { email } = user || {};

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged out successfully');
      setAuthDetails(null);
    }
  };

  return (
    <nav>
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-6`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* left side */}
            <img src={Logo} alt='logo' />

            {/* right side */}
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Link
                    page='Home'
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page='Benefits'
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page='Our Classes'
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                  <Link
                    page='Our Trainers'
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                  />
                </div>
                <div className={`${flexBetween} gap-8`}>
                  {email ? (
                    <button onClick={handleLogOut}>{email}</button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Sign In
                    </button>
                  )}
                  {appDetails?.user?.aud !== 'authenticated' && (
                    <ActionButton setSelectedPage={setSelectedPage}>
                      Become a Member
                    </ActionButton>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <button
                  className='rounded-full bg-secondary-500 p-2'
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Bars3Icon className='h-6 w-6 text-white' />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile menu modal */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className='fixed right-0 bottom-0 z-40 h-full w-[300px] bg-primary-100 drop-shadow-xl'>
          {/* close icon */}
          <div className='flex justify-end p-12'>
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className='h-6 w-6 text-gray-400' />
            </button>
          </div>

          {/* menu items */}
          <div className='ml-[33%] flex flex-col gap-10 text-2xl'>
            <Link
              page='Home'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page='Benefits'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page='Our Classes'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            <Link
              page='Contact Us'
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
