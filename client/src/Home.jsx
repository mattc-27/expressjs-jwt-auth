import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import './App.css';

const Home = () => {



    return(
        <div className='container'>
            <h1>JWT Authentication with Express</h1>
            <Login />
        </div>
    );
}

export default Home; 