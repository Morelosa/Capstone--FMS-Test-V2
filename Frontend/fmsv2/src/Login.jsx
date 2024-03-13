import React, {useState} from "react";

import Fms_Logo from '../src/Fms_Logo.jpg'
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <div className="header">
                <div className="text"></div>
                <div className="underline"></div>
            </div>
             <div className="inputs">
                <div className="input">
                    <img src={Fms_Logo} height={100} width={150}/>
                    <h2>Sign In</h2>
             </div>
        <form className="Login-form"onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="***********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <div className="forgot-password">Forgot password? <span>Click Here!</span></div>
        <button className="Link-btn" onClick={() => props.onFormSwitch('SignUp')}>Don't have an account? Sign Up!</button>
        </div>
        </div>

    )
}