'use client';
import './login.css'
import { signIn } from 'next-auth/react';

export default function Login(){
    return(
        <div className='LoginContainer'>
            <div className='LoginForm'>
                <img src= '/2.svg' className='LogoLogin'></img>
                

                <input type='text' placeholder='E-mail'></input>
                <input type='password' placeholder='Haslo'></input>
                
                <button className='Login' type='submit'>Zaloguj</button>
                <button
                    className='google-btn'
                    type='button'
                    onClick={() => signIn('google', {callbackUrl: '/oferty'})}
                >
                <img src="/googleIcon.svg" alt="Google logo" />
                 Sign in with google
                </button>
                
                
                
                
                
            </div>
        </div>
        //dsa
    )
}
