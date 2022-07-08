import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Account from './pages/user/account/Account';
import Add from './pages/user/add/Add';
import './global.scss'


import Home from './pages/everyone/home/Home';
import Login from './pages/auth/login/Login';
import Maps from './pages/everyone/maps/Maps';
import Register from './pages/auth/register/Register';
import AllSpots from './pages/everyone/allSpots/AllSpots';
import MySpots from './pages/user/mySpots/MySpots';
import SingleSpot from './components/singleSpot/SingleSpot';
import Favoris from './pages/user/favoris/Favoris';
import HandleSpots from './pages/admin/handleSpots/HandleSpots';
import { useContext } from 'react';
import { Context } from './context/Context';
import { useState } from 'react';
import MobileMenu from './components/mobileMenu/MobileMenu';

function App() {

  const {user} = useContext(Context)

  const [actif, setActif] = useState(false)


  return (
    <div className="App">
         <BrowserRouter>
         <Sidebar actif={actif} setActif={setActif} />
         <MobileMenu actif={actif} setActif={setActif} />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={user ? <Home /> : <Login />} />
            <Route path="register" element={user ? <Home /> : <Register />} />
            <Route path="maps" element={<Maps />} />
            <Route path="spots" element={<AllSpots />} />
            <Route path="post/:id" element={<SingleSpot />} />
            <Route path="account">
              <Route index element={user ? <Account /> :  <Login />} />
              <Route path="add" element={user ? <Add /> :  <Login />} />
              <Route path="myspots" element={user ? <MySpots /> :  <Login />} />
              <Route path="favoris" element={user ? <Favoris /> :  <Login />} />
            </Route>
            <Route path="admin">
              <Route index element={<Account />} />
              <Route path="handlespots" element={(user && user.isAdmin) ? <HandleSpots /> :  <Account />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
