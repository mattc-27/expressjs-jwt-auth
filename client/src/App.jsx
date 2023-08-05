import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Routes, 
  Route, 
  BrowserRouter
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Home from './Home';
import Dashboard from './components/Dashboard';

import { AuthContextProvider } from './AuthContext';

import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard/:username',
    element: <Dashboard />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
]);


function App() {

  return (
    <BrowserRouter>

    <AuthContextProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard/:username' element={<Dashboard />} />
    </Routes>
    </AuthContextProvider>
  </BrowserRouter>
  )
}

export default App
