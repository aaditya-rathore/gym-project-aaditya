import Navbar from '@/scenes/navbar';
import { useEffect, useState } from 'react';
import { SelectedPage } from '@/shared/types';
import Home from '@/scenes/home';
import OurClasses from '@/scenes/ourClasses';
import Benifits from '@/scenes/benifits';
import ContactUs from '@/scenes/contactUs';
import Footer from '@/scenes/Footer';
import OurTrainer from './scenes/trainer';
import SignIn from './signin/signin';
import { Toaster } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Session } from 'inspector';

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [authDetails, setAuthDetails] = useState<
    | {
        user: User | null;
        session: Session | null;
      }
    | null
    | string
  >(null);

  useEffect(() => {
    if (localStorage.getItem('sb-zbmroyocrfoxcwfzeebn-auth-token')) {
      setAuthDetails(
        JSON.parse(
          localStorage.getItem('sb-zbmroyocrfoxcwfzeebn-auth-token' || '{}') ||
            '{}'
        )
      );
    } else {
      setAuthDetails({});
    }
  }, [authDetails?.session]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(authDetails);

  return (
    <div className='app bg-gray-20 '>
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        setShowModal={setShowModal}
        appDetails={authDetails}
        setAuthDetails={setAuthDetails}
      />
      <Home setSelectedPage={setSelectedPage} />
      <Benifits setSelectedPage={setSelectedPage} />
      <OurClasses setSelectedPage={setSelectedPage} />

      {!authDetails?.access_token && (
        <ContactUs
          setSelectedPage={setSelectedPage}
          setAuthDetails={setAuthDetails}
        />
      )}

      <OurTrainer setSelectedPage={setSelectedPage} />

      {showModal && (
        <SignIn setShowModal={setShowModal} setAuthDetails={setAuthDetails} />
      )}
      <Footer />
      <Toaster richColors />
    </div>
  );
}

export default App;
