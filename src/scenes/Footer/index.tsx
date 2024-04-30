import Logo from "@/assets/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={Logo} />
          <p className="my-5">
          Transform your home gym into a sanctuary of fitness and well-being with our expertly curated selection of equipment, classes, and training programs. 
          Whether you're a seasoned athlete or just beginning your fitness journey, we're here to support you every step of the way.
          </p>
          <p>© Evogym All Rights Reserved.</p>
        </div>
        
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">evogym@gmail.com</p>
          <p>9549139881</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;