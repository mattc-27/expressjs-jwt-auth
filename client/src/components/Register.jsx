import React, { useState, useEffect } from 'react';
import '../App.css';

const Register = () => {


    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    useEffect(() => {
        console.log(inputs);
    }, [setInputs])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: inputs.username, password: inputs.password }),
                credentials: 'include'
            })
            const data = await response.json();
            window.location = `/`;

        } catch (err) {
            console.error(err.message);
        }
    };


    return (
        <div className='container'>
            <h1>JWT Authentication with Express</h1>

            <div className="containerLogin">
                <div className='pageHeader'>
                    <h2>Register</h2>
                </div>
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
                            Submit
                        </button>
                        <a href='/'>Login</a>

                    </div>
                </form>


            </div>
        </div>
    );
}

export default Register; 