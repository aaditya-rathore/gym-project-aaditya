type Props = {
  name: string;
  description?: string;
  rating?: JSX.Element;
  image: string;
  link: string;
};

const Class = ({
  name,
  description = 'some description ',
  rating,
  image,
  link,
}: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex h-full  w-[450px] flex-col items-center justify-center 
  whitespace-normal bg-primary-500 text-center text-[#000000] 
  opacity-0 transition duration-500 hover:opacity-90`;
  return (
    <li className='relative mx-5 inline-block h-full w-[450px]'>
      <div className={overlayStyles}>
        <span className='text-2xl text-white'>{name}</span>
        <span className='mt-5'>{description}</span>
        <span className='mt-5 '>{rating}</span>
        <a
          className='rounded-md bg-secondary-500 px-10 py-2  hover:text-white'
          href={link || ''}
          target='_blank'
          rel='noopener noreferrer'
        >
          Follow me
        </a>
      </div>
      <img alt='image' src={image} />
    </li>
  );
};

export default Class;
