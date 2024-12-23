import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Message from './components/Message';
import Signup from './components/signup';
import Login from './components/login';
import Chat from './components/Chat';
import Cookies from 'js-cookie';  // Correct import for js-cookie
import Navbar from './components/Navbar';
import Page from './components/Page';

function App() {

  return (
    <div className='h-screen overflow-hidden'>
    {/* <Navbar/>
    <Page/> */}
    <Routes>
      <Route path='/' element={Cookies.token ? <Navigate to="/chat" /> : <Navigate to="/login" />} />
      <Route path='/signup' element={<Signup  />} />
      <Route path='/login' element={<Login  />} />
      <Route path='/chat' element={<Message />} />
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
    </div>
  );
}

export default App;
