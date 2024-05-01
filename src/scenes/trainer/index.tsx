import { SelectedPage, ClassType } from '@/shared/types'
import image1 from "@/assets/trainer1.jpg";
import image2 from "@/assets/trainer3.jpg";
import image3 from "@/assets/trainer4.jpg";
import { motion } from 'framer-motion';
import HText from '@/shared/HText';
import Class from './Class';
import { useEffect, useState } from 'react';
import supabase from '../supabase';


const classes: Array<ClassType> = [
  {
    name: "Aaditya",
    rating: <StarRating trainer='Aaditya'/>,
    
    description:"Experience: 5 years\nDuration:60 minutes",
    image: image1
  },
  {
    name: "Rishi",
    rating: <StarRating trainer={'Rishi'}/>,
    description:"Experience: 8 years\nDuration:90 minutes",
    image: image2
  },
  {
    name: "Sahitya",
    rating: <StarRating trainer={'Sahitya'}/>,
    description:"Experience: 5.6 years\nDuration:90 minutes",
    image: image3 
  },
]
type Props = {
    setSelectedPage:(value:SelectedPage)=>void;
};

const OurTrainer = ({setSelectedPage}: Props) => {
  return (
    <section id='ourclasses' className='w-full bg-primary-100 py-40'>
        <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.OurClasses)}>
            <motion.div
              className='mx-auto w-5/6'
              initial="hidden"
              whileInView="visible"
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
                {classes.map((item, index) => (
                  <Class
                    key={`${item.name}-${index}`}
                    name={item.name}
                    description={item.description}
                    rating={item.rating}
                    image={item.image}     
                      />
                ))}
              </ul>

            </div>
        </motion.div>
    </section>
  )
}

export default OurTrainer


type PropsRating = {
  trainer?:string
}
function StarRating({trainer}:PropsRating) {
  
  const [stars, setStars] = useState([false, false, false, false, false]);
  const [render, setRender] = useState(false)
  const [count, setCount] = useState<number|null>(0)
  const [avgRating, setAvgRating] = useState<number|null>(0)
  useEffect(() => {
    const getRatings = async () => {
      let { data, error } = await supabase
          .from('Rating')
          .select('rating')
          .eq('trainer_name', trainer);
      
      if (error) {
          console.error('Error fetching ratings:', error);
      } else {
        /***@ts-ignore */
        let sumRatings = data.reduce((acc, curr) => acc + curr.rating, 0);
        /***@ts-ignore */
          let countRatings = data.length;
          setCount(countRatings);
          setAvgRating(sumRatings / countRatings);
          console.log('Sum of ratings:',trainer, sumRatings);
          console.log('Count of ratings:',trainer, countRatings);
      }
}
getRatings()
  }, [render])

  const handleStarClick =async (index:number) => {
    const updatedStars = stars.map((star, i) => i <= index ? true : false);
    
    setStars(updatedStars);
    alert(`thank you for rating ${trainer} as ${index+1} stars`);

    const { data } = await supabase
    .from('Rating')
    .insert([
      { trainer_name: trainer, rating: index+1 },
    ])
    .select()
    console.log(data);
    setRender(prev=>!prev)
    
  };

  return (
    <>
    <div className='flex justify-center items-center'>
      {stars.map((filled, index) => (
        <div
          key={index}
          onClick={() => handleStarClick(index)}
          style={{ cursor: 'pointer' }}
        >
          {filled ? <p>&#9733;</p> : <p>&#9734;</p> }
        </div>
      ))}
    </div>
    <p>avg rating: {avgRating}</p>
      <p>Total Rating: {count}</p>
        </>
  );
}

