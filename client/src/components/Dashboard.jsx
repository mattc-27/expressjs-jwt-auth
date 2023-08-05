import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

import AuthContext from '../AuthContext';


const Dashboard = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const [userInfo, setUserInfo] = useState({});
   
    const { isLoggedIn, login, logout } = useContext(AuthContext);

 
    useEffect(() => {
        async function fetchUserInfo() {
            
            try {
               
                const response = await fetch(`/api/user/${username}`);
                const data = await response.json();
                console.log(data);
     
                if (data.isValid) {
        
                   
                    setUserInfo({
                        id: data.currentUser.id,
                        username: data.currentUser.username,
                       
                    });
        
                }
            
                
            } catch (error) {
                console.log(error.message);
            }
        } fetchUserInfo();
    }, []);

    /* const goToProfile = async () => {
        // console.log(userInfo);
        navigate(`/profile/${userInfo.id}`);
 
    } */

    const logoutUser = async () => {
        try {
            await fetch(`/api/auth/logout`);
    
            
            window.location = `/dashboard/${username}`;
     
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id='dashboard' className='dbContainer'>
            <div className='pageTitle'>
                {userInfo.isLoggedIn ?
                    <h2>Welcome, {userInfo.username}</h2>
                    : <h2>Oops...</h2>}
            </div>
            <div className="pageContent">
                {userInfo.isLoggedIn ?
                    <p>User id: {userInfo.id} </p>
                    : <p>You've logged out... </p>}
            </div>
            <>
                {userInfo.isLoggedIn ?
                    <button
                        className='logoutButton'
                        onClick={logoutUser}
                    > Logout
                    </button> :
                    <button
                        className='returnHomeButton'
                        onClick={() => navigate(`/`)}
                    > Return to login
                    </button>}
            </>
        </div>
    );
}
export default Dashboard;

