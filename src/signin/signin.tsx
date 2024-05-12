import { login } from '@/authentication/apiAuth';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

type SignInProps = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setAuthDetails: Dispatch<SetStateAction<object>>;
};

function SignIn({ setShowModal, setAuthDetails }: SignInProps) {
  const { register } = useForm();

  const handleSubmitLogin = async (e: unknown) => {
    e.preventDefault();
    const res = await login(e.target.email.value, e.target.password.value);
    if (res?.isLoggedIn) {
      setShowModal(false);
      setAuthDetails(res?.data);
    }
  };

  return (
    <div className='fixed top-0 left-0 z-10 h-screen w-screen bg-black/50 flex items-center justify-center'>
      <div className='bg-white absolute p-6 rounded-lg flex flex-col items-center justify-center gap-3'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-3xl text-primary-500'>Sign in</h1>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <hr />
        <form onSubmit={(e) => handleSubmitLogin(e)}>
          <input
            className={
              'mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white'
            }
            type='email'
            placeholder='email'
            defaultValue={'evogym@gmail.com'}
            {...register('email', {
              required: true,
              maxLength: 100,
            })}
          />
          <input
            className={
              'mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white'
            }
            type='password'
            defaultValue={'123456789'}
            placeholder='password'
            {...register('password', {
              required: true,
              maxLength: 100,
            })}
          />
          <button
            type='submit'
            className='border border-primary-500 rounded-lg py-2 px-4 text-center hover:bg-primary-500 hover:text-white'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
