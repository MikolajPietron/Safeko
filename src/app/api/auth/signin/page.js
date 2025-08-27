'use client';
import './login.css'
import { signIn } from 'next-auth/react';

export default function Login(){
    return(
        <div className='LoginContainer'>
            <div className='LoginForm'>
                <img src= '/default_logo.svg' className='LogoLogin'></img>

                <input type='text' placeholder='E-mail'></input>
                <input type='password' placeholder='Hasło'></input>
                <div className='loginAndGoogleContainer'>

                <button className='Login' type='submit'>Zaloguj</button>
                <button
                    className='google-btn'
                    type='button'
                    onClick={() => signIn('google', {callbackUrl: '/oferty'})}
                >
                <img src="/googleIcon.svg" alt="Google logo" />
                 
                </button>
                </div>
                
                
                
                
                
            </div>
        </div>
        //dsa
    )
}
