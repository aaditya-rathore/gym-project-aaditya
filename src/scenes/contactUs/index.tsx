import { FieldValues, useForm } from 'react-hook-form';
import { SelectedPage } from '@/shared/types';
import { motion } from 'framer-motion';
import ContactUsPageGraphic from '@/assets/ContactUsPageGraphic.png';
import HText from '@/shared/HText';
import supabase from '../supabase';
import { toast } from 'sonner';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  setAuthDetails: (value: string) => void;
};

const ContactUs = ({ setSelectedPage, setAuthDetails }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300
  px-5 py-3 placeholder-white`;

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  const signUp = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    return { data, error };
  };

  const onSubmit = async (formData: FieldValues) => {
    const { name, email, password } = formData;
    const { data, error } = await signUp({ name, email, password });

    if (error) {
      toast.error(error.message);
      return;
    } else {
      toast.success('Sign up successful');
      reset();
      setAuthDetails(data);
    }
  };

  return (
    <section id='contactus' className='mx-auto w-5/6 pt-24 pb-32'>
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
        {/* HEADER */}
        <motion.div
          className='md:w-3/5'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            <span className='text-primary-500'>JOIN NOW</span> TO GET IN SHAPE
          </HText>
          <p className='my-5'>
            Transform your home gym into a sanctuary of fitness and well-being
            with our expertly curated selection of equipment, classes, and
            training programs. Whether you're a seasoned athlete or just
            beginning your fitness journey, we're here to support you every step
            of the way. Elevate your workouts, achieve your goals, and embrace
            the power of home fitness with us.
          </p>
        </motion.div>

        {/* FORM AND IMAGE */}
        <div className='mt-10 justify-between gap-8 md:flex'>
          <motion.div
            className='mt-10 basis-3/5 md:mt-0'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className={inputStyles}
                type='text'
                placeholder='NAME'
                {...register('name', {
                  required: 'This field is required.',
                })}
              />
              {errors.name && (
                <p className='mt-1 text-primary-500'>
                  {errors.name.message as React.ReactNode}
                </p>
              )}
              <input
                className={inputStyles}
                type='email'
                placeholder='EMAIL'
                {...register('email', {
                  required: 'This field is required.',
                })}
              />
              {errors.email && (
                <p className='mt-1 text-primary-500'>
                  {errors.email.message as React.ReactNode}
                </p>
              )}
              <input
                className={inputStyles}
                type='password'
                placeholder='PASSWORD'
                {...register('password', {
                  required: 'This field is required.',
                  minLength: {
                    value: 8,
                    message: 'Min length is 8 char.',
                  },
                })}
              />
              {errors.password && (
                <p className='mt-1 text-primary-500'>
                  {errors.password.message as React.ReactNode}
                </p>
              )}
              <input
                className={inputStyles}
                type='password'
                placeholder='CONFIRM PASSWORD'
                {...register('confirmPassword', {
                  required: 'This field is required.',
                  validate: (value) =>
                    value === getValues().password || 'Passwords do not match.',
                  minLength: { value: 8, message: 'Min length is 8 char.' },
                })}
              />
              {errors.confirmPassword && (
                <p className='mt-1 text-primary-500'>
                  {errors.confirmPassword.message as React.ReactNode}
                </p>
              )}
              <button type='submit' className={inputStyles}>
                SUBMIT
              </button>
            </form>
          </motion.div>

          <motion.div
            className='relative mt-16 basis-2/5 md:mt-0'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className='w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext'>
              <img
                className='w-full'
                alt='contact-us-page-graphic'
                src={ContactUsPageGraphic}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
