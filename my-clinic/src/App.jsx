import { useState } from 'react'
import { Suspense, lazy } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import PageTeste from "./pages/teste";
import Profile from "./pages/Profile";
import SchedulePage from "./pages/Schedule";
import { Height, Schedule } from '@mui/icons-material';

function App() {

  return (
    <>
  <div style={{Height:"110%"}}>

  
      <Routes >
          <Route path='/' element={
            <Suspense fallback={<Loading />}>
              <PageTeste />
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
      </Routes>
    </div>
      <NavBar/>
    
    </>
  )
}

export default App
