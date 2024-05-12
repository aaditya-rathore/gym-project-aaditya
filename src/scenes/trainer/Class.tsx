type Props = {
  name: string;
  description?: string;
  rating?: JSX.Element;
  image: string;
};

const Class = ({
  name,
  description = 'some description ',
  rating,
  image,
}: Props) => {
  const overlayStyles = `p-5 absolute z-30 flex h-[380px] w-[450px] flex-col items-center justify-center 
  whitespace-normal bg-primary-500 text-center text-[#000000] 
  opacity-0 transition duration-500 hover:opacity-90`;
  return (
    <li className='relative mx-5 inline-block h-[380px] w-[450px]'>
      <div className={overlayStyles}>
        <span className='text-2xl'>{name}</span>
        <span className='mt-5'>{description}</span>
        <span className='mt-5'>{rating}</span>
      </div>
      <img alt='image' src={image} />
    </li>
  );
};

export default Class;
