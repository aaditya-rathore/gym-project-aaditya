import Navbar from '@/scenes/navbar'
import { useEffect, useState } from 'react'
import { SelectedPage } from '@/shared/types';
import Home from '@/scenes/home';
import OurClasses from "@/scenes/ourClasses";
import Benifits from '@/scenes/benifits';
import ContactUs from '@/scenes/contactUs';
import Footer from '@/scenes/Footer';
import OurTrainer from './scenes/trainer';
import SignIn from './signin/signin';


function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [showModal, setShowModal] = useState<boolean>(false);
  const[isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    
      <div className='app bg-gray-20 '>
        <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        setShowModal={setShowModal}
        />
        <Home setSelectedPage={setSelectedPage}/>
        <Benifits setSelectedPage={setSelectedPage}/>
        <OurClasses setSelectedPage={setSelectedPage}/>
        <ContactUs setSelectedPage={setSelectedPage}/>
        <OurTrainer setSelectedPage={setSelectedPage}/>
        {/*@ts-ignore */}
      {showModal && <SignIn setShowModal={setShowModal} />}
        <Footer/>
       
      </div>
  )
}

export default App