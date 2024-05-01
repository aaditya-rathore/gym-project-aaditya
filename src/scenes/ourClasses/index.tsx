import { SelectedPage, ClassType } from '@/shared/types'
import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.webp";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.webp";
import image5 from "@/assets/image5.png";
import image6 from "@/assets/image6.jpg";
import { motion } from 'framer-motion';
import HText from '@/shared/HText';
import Class from './Class';

const classes: Array<ClassType> = [
  {
    name: "Weight Training Classes",
    description: "Join our expert trainers for invigorating sessions that will challenge and inspire you every step of the way. With a focus on proper form, technique, and personalized guidance, you'll learn how to optimize your workouts for maximum results while minimizing the risk of injury.",
    image: image1
  },
  {
    name: "Yoga Classes",
    description: "Step into your personal sanctuary and embark on a journey of self-discovery and rejuvenation with our virtual yoga class designed specifically for your home gym. Whether you're a seasoned yogi or just beginning your practice, our classes offer a sanctuary for you to explore and deepen your connection to mind, body, and spirit.",
    image: image2
  },
  {
    name: "Ab Core Classes",
    description: "Welcome to Core Power, your go-to destination for a dynamic and effective ab core workout right in the comfort of your home gym. Designed to sculpt and strengthen your core muscles, this class will help you achieve a rock-solid midsection while improving your overall stability and posture.",
    image: image3
  },
  {
    name: "Adventure Classes",
    description: "Embark on an exhilarating journey of discovery and excitement without ever leaving the comfort of your home gym with our virtual adventure class. Designed to awaken your sense of adventure and push your limits, this class offers an immersive experience that will transport you to breathtaking landscapes and epic challenges.",
    image: image4
  },
  {
    name: "Fitness Classes",
    description: "Welcome to HomeFit, where your fitness goals become reality in the comfort of your own home gym! Our virtual fitness class offers a comprehensive and dynamic workout experience suitable for all fitness levels, designed to help you sculpt your body, boost your strength, and elevate your overall health and wellness.",
    image: image5
  },
  {
    name: "Training Classes",
    description: "Welcome to Home Gym Mastery, where we empower you to maximize your potential and achieve your fitness goals from the comfort of your own home gym. Our training class is designed to provide you with the knowledge, guidance, and motivation you need to take your workouts to the next level and see real results.",
    image: image6
  }
]
type Props = {
    setSelectedPage:(value:SelectedPage)=>void;
};

const OurClasses = ({setSelectedPage}: Props) => {
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
                <HText>OUR CLASSES</HText>
                <p className='py-5'></p>
              </div>
            </motion.div>
            <div className='mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden'>
              <ul className='w-[2800px] whitespace-nowrap'>
                {classes.map((item, index) => (
                  <Class
                    key={`${item.name}-${index}`}
                    name={item.name}
                    description={item.description}
                    image={item.image}     
                      />
                ))}
              </ul>
            </div>
        </motion.div>
    </section>
  )
}

export default OurClasses