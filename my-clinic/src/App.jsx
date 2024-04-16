import { useState } from 'react'
import { Suspense, lazy } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import AppBar from './components/AppBar';
import HomePage from "./pages/Home";
import Profile from "./pages/Profile";
import CalendarPage from "./pages/AppointmentPage";

import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";

import SchedulePage from "./pages/Schedule";
import { Height, Schedule } from '@mui/icons-material';

function App() {

  const [loginState,setLoginState] = useState(false);


  return (
    <>
  <div style={{Height:"110%"}}>


      {loginState && <AppBar setLoginState={setLoginState}/>}
      <Routes >
          {
            !loginState &&
          
          <Route path='/' element={
            <Suspense fallback={<Loading />}>
              <LoginPage setLoginState={setLoginState}/>
            </Suspense>
          }/>}
          <Route path='/sign-up' element={
            <Suspense fallback={<Loading />}>
              <SignUp setLoginState={setLoginState}/>
            </Suspense>
          }/>
          {
            loginState &&
            <>
          <Route path='/' element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }/>
          <Route path='/register/patient' element={
            <Suspense fallback={<Loading />}>
              <h1>Registo</h1>
            </Suspense>
          }/>
          <Route path='/checkIn' element={
            <Suspense fallback={<Loading />}>
              <h1>Check-In</h1>
            </Suspense>
          }/>
          <Route path='/schedule' element={
            <Suspense fallback={<Loading />}>
              <SchedulePage/>
            </Suspense>
          }/>
          <Route path='/profile' element={
            <Suspense fallback={<Loading />}>
              <Profile/>
            </Suspense>
          }/>
          <Route path='/agenda' element={
            <Suspense fallback={<Loading />}>
              <CalendarPage/>
            </Suspense>
          }/>

          </>}
      </Routes>
    </div>
      {loginState && <NavBar/>}
    
    </>
  )
}

export default App
