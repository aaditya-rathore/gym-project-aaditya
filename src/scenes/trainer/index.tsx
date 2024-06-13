import { SelectedPage, ClassType } from '@/shared/types';
import image1 from '@/assets/trainer1.jpg';
import image2 from '@/assets/trainer3.jpg';
import image3 from '@/assets/trainer4.jpg';
import { motion } from 'framer-motion';
import HText from '@/shared/HText';
import Class from './Class';
import { useEffect, useState } from 'react';
import supabase from '../supabase';
import { toast } from 'sonner';

const getTrainers = (isLoggedIn: boolean) => {
  const trainers: Array<ClassType> = [
    {
      name: 'Rishabh',
      rating: <StarRating isLoggedIn={isLoggedIn} trainer='Aaditya' />,

      description: 'Experience: 8 years\nDuration:60 minutes',
      image: image1,
      link: 'https://openinapp.link/p5imr',
    },
    {
      name: 'Anoop pandey',
      rating: <StarRating isLoggedIn={isLoggedIn} trainer={'Rishi'} />,
      description: 'Experience: 7 years\nDuration:90 minutes',
      image: image2,
      link: 'https://openinapp.link/deac5',
    },
    {
      name: 'vijay',
      rating: <StarRating isLoggedIn={isLoggedIn} trainer={'Sahitya'} />,
      description: 'Experience: 5 years\nDuration:90 minutes',
      image: image3,
      link: 'https://openinapp.link/pbs4c',
    },
  ];
  return trainers;
};

type Props = {
  isLoggedIn: boolean;
  setSelectedPage: (value: SelectedPage) => void;
};

const OurTrainer = ({ setSelectedPage, isLoggedIn }: Props) => {
  return (
    <section id='trainer' className='w-full bg-primary-100 py-40'>
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Trainer)}>
        <motion.div
          className='mx-auto w-5/6'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <div className='md:w-3/5'>
            <HText>OUR Trainer</HText>
            <p className='py-5'></p>
          </div>
        </motion.div>
        <div className='mt-10 h-[353px] mx-auto flex items-center justify-center w-full overflow-x-auto overflow-y-hidden'>
          <ul className=' whitespace-nowrap'>
            {getTrainers(isLoggedIn).map((item, index) => (
              <Class
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                rating={item.rating}
                image={item.image}
                link={item.link as string}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default OurTrainer;

type PropsRating = {
  trainer?: string;
  isLoggedIn?: boolean;
};
function StarRating({ trainer, isLoggedIn }: PropsRating) {
  const [stars, setStars] = useState([false, false, false, false, false]);
  const [render, setRender] = useState(false);
  const [count, setCount] = useState<number | null>(0);
  const [avgRating, setAvgRating] = useState<number | null>(0);

  const handleStarClick = async (index: number) => {
    if (!isLoggedIn) {
      toast.error('Please login to rate');
      return;
    }
    const updatedStars = stars.map((star, i) => {
      if (i <= index) {
        return true;
      } else {
        return star;
      }
    });

    setStars(updatedStars);
    toast.success(`Thank you for rating ${trainer} as ${index + 1} stars`);

    await supabase
      .from('Rating')
      .insert([{ trainer_name: trainer, rating: index + 1 }])
      .select();
    setRender((prev) => !prev);
  };

  useEffect(() => {
    const getRatings = async () => {
      const { data, error } = await supabase
        .from('Rating')
        .select('rating')
        .eq('trainer_name', trainer);

      if (error) {
        console.error('Error fetching ratings:', error);
      } else {
        const sumRatings =
          data.reduce((acc, curr) => acc + curr.rating, 0) || 0;

        const countRatings = data.length;
        setCount(countRatings);
        setAvgRating(sumRatings / countRatings);
      }
    };
    getRatings();
  }, [render]);

  return (
    <>
      <div className='flex justify-center items-center'>
        {stars.map((filled, index) => (
          <div
            key={index}
            onClick={() => handleStarClick(index)}
            style={{ cursor: 'pointer' }}
            className='text-3xl'
          >
            {filled ? <span>&#9733;</span> : <span>&#9734;</span>}
          </div>
        ))}
      </div>
      <p>Avg rating: {(avgRating || 0)?.toFixed(1) || 0}</p>
      <p>Total Rating: {count}</p>
    </>
  );
}

