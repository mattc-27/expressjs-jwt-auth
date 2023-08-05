import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AuthContext from '../AuthContext';

import '../App.css';

const Login = () => {

    const { isLoggedIn, login, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/auth/login`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: inputs.username, password: inputs.password })
                })
            const data = await response.json();
            console.log(data);
            if (data.isValid) {
                const response = await fetch(`/api/auth/protected/${data.username}`)
                const auth = await response.json();
             
                console.log(auth);
                navigate(`/dashboard/${data.username}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="containerLogin">
            {/* <div className='pageHeader'>
                <h2>Login</h2>
            </div>
    */}
            <form className='loginForm'>
                <div className='formGroup'>
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder="Enter username"
                        name='username'
                        value={inputs.username}
                        onChange={handleChange}
                    />
                </div>
                <div className='formGroup'>
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder="Password"
                        name='password'
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='formOptions'>
                    <button
                        className="loginButton"
                        onClick={onSubmitForm}
                    >
                        Login
                    </button>
                    <a href='/register'>Create an account</a>
                </div>
            </form>
        </div>
    );
}

export default Login; 