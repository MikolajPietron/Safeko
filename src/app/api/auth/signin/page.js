import './login.css'
export default function Login(){
    return(
        <div className='LoginContainer'>
            <div className='LoginForm'>
                <img src='SafekoLogin.jpg'></img>
                <input type='text' placeholder='email'></input>
                <input type='password' placeholder='haslo'></input>
                
            </div>
        </div>
    )
}
