'use client';
import './login.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/oferty'); // redirect after successful login
    }
  };

  return (
    <div className='LoginContainer'>
      <div className='leftPillar'>

      </div>
      <div className='LoginForm'>
        <img src='/default_logo.svg' className='LogoLogin' />

        <form className='LoginFormReal' onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Hasło'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='button' className='register-btn' onClick={() => router.push('/auth/register')}>
              Zarejestruj się
            </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className='loginAndGoogleContainer'>
            <button className='Login' type='submit'>Zaloguj</button>

            <button
              className='google-btn'
              type='button'
              onClick={() => signIn('google', { callbackUrl: '/oferty' })}
            >
              <img src='/googleIcon.svg' alt='Google logo' />
            </button>

            
          </div>
          
        </form>
      </div>
      <div className='rightPillar'>
        
      </div>
    </div>
  );
}
