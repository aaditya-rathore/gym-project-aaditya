import HText from "@/shared/HText";
import { BenefitType, SelectedPage } from "@/shared/types";
import { HomeModernIcon, UserGroupIcon, AcademicCapIcon} from "@heroicons/react/24/solid"
import { motion } from "framer-motion";
import Benefit from "./Benefit";
import BenefitsPageGraphic from "@/assets/BenefitsPageGraphic.png";
import ActionButton from "@/shared/ActionButton";

const benifits: Array<BenefitType> = [
    {
        icon: <HomeModernIcon className="h-6 w-6" />,
        title: "State of the Art Facilities",
        description: "we redefine the home gym experience with our state-of-the-art facility designed to inspire, motivate, and transform."
    },
    {
        icon: <UserGroupIcon className="h-6 w-6" />,
        title: "100's of Diverse Classes",
        description: "your ultimate destination for an unparalleled selection of diverse fitness classes designed exclusively for your home gym. "
    },
    {
        icon: <AcademicCapIcon className="h-6 w-6" />,
        title: "Expert and Pro Trainers",
        description: "your premier destination for expert and pro-level training programs designed to take your home gym workouts to the next level."
    }
];

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    }
}

type Props = {
    setSelectedPage: (value: SelectedPage) => void;
}

const Benifits = ({setSelectedPage}: Props) => {
  return (
    <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
        <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
        >
            {/* HEADER */}
            <motion.div
             className="md:my-5 md:w-3/5"
             initial="hidden"
             whileInView="visible"
             viewport={{once:true,amount:0.5}}
             transition={{duration:0.5}}
             variants={{
                hidden:{opacity:0,x:-50},
                visible:{opacity:1,x:0},
             }}
            >
                <HText>MORE THAN JUST A GYM.</HText>
                <p className="my-5 text-sm">
                    We provide world class fitness equipment, trainers and classes to 
                    get you to your ultimate fitness goals with ease. We provide true
                     care into each and every member.
                </p>
            </motion.div>

            {/* BENIFITS */}
            <motion.div className="md:flex items-center justify-between gap-8 mt-5"
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            variants={container}
            >
                {/* BENIFIT 1 */}
                {benifits.map((benifit: BenefitType) => (
                    <Benefit
                    key={benifit.title}
                    icon={benifit.icon}
                    title={benifit.title}
                    description={benifit.description}
                    setSelectedPage={setSelectedPage}
                     />
                ))}
            </motion.div >
            {/*Graphics And Description*/}
            <div className="mt-16 items-center justify-between md:mt-28 md:flex">
                {/*Graphic */}
                <img
                    className="mx-auto"
                    alt="benifits-page-graphic"
                    src={BenefitsPageGraphic}
                    />

                {/*Description */}
                <div>
                    {/*Title */}
                    <div className="relative">
                        <div className="before:absolute before:-top-20 before:-left-20 before:content-abstractwaves">
                            <motion.div
                             initial="hidden"
                             whileInView="visible"
                             viewport={{once:true,amount:0.5}}
                             transition={{duration:0.5}}
                             variants={{
                                hidden:{opacity:0,x:50},
                                visible:{opacity:1,x:0},
                             }}
                             >
                                <HText>
                                    THOUSANDS OF HAPPY MEMBERS GETTING{" "}
                                    <span className="text-primary-500">FIT</span>
                                </HText>
                            </motion.div>
                        </div>
                    </div>

                    {/*Description */}
                    <motion.div
                     initial="hidden"
                     whileInView="visible"
                     viewport={{once:true,amount:0.5}}
                     transition={{delay:0.2,duration:0.5}}
                     variants={{
                        hidden:{opacity:0,x:-50},
                        visible:{opacity:1,x:0},
                     }}
                     >
                        <p className="my-5">Welcome to our thriving community of thousands of happy members who are on a journey to transform their lives and achieve peak fitness! At our gym, we're dedicated to providing a supportive and empowering environment where individuals of all fitness levels can thrive.</p>
                        <p className="mb-5">Whether you're just starting out on your fitness journey or you're a seasoned athlete, our state-of-the-art facilities, expert trainers, and diverse range of classes cater to everyone's needs. From high-intensity interval training to calming yoga sessions, we offer a variety of workouts to help you reach your goals and keep your workouts exciting.</p>
                        <p className="mb-5">But our gym is more than just a place to work out – it's a community where friendships are forged, achievements are celebrated, and obstacles are overcome together. Our passionate team is here to support and motivate you every step of the way, ensuring that you stay inspired and committed to your health and fitness goals.</p>
                        <p className="mb-5">Join us today and become part of our vibrant community of individuals who are not just getting fit, but also living their best lives. Your journey to a healthier, happier you starts here!</p>
                    </motion.div>

                    {/*Button */}
                    <div className="relative mt-16">
                        <div className="before:absolute before:-bottom-20 before:right-40 before:z-[-1] before:content-sparkles">
                            <ActionButton setSelectedPage={setSelectedPage}>
                                Join Now
                            </ActionButton>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        
    </section>
  )
}

export default Benifits