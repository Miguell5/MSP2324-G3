import { useState } from 'react'
import { Suspense, lazy } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import NavBar from './components/NavBar';
import PageTeste from "./pages/teste";
import Profile from "./pages/Profile";

function App() {

  return (
    <>
    
      <Routes>
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
          <Route path='/schedule/appointment' element={
            <Suspense fallback={<Loading />}>
              <h1>schedule appointment</h1>
            </Suspense>
          }/>
          <Route path='/schedule/exam' element={
            <Suspense fallback={<Loading />}>
              <h1>schedule exam</h1>
            </Suspense>
          }/>
          <Route path='/profile' element={
            <Suspense fallback={<Loading />}>
              <Profile/>
            </Suspense>
          }/>
      </Routes>
      <NavBar/>
    </>
  )
}

export default App
