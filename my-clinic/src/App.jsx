import { useState } from 'react'
import { Suspense, lazy } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Loading from './pages/Loading';
import NavBar from './components/NavBar';
const LazyHome = lazy(() => import("./pages/teste"));

function App() {

  return (
    <>
    
      <Routes>
          <Route path='/' element={
            <Suspense fallback={<Loading />}>
              <LazyHome />
            </Suspense>
          }/>
          <Route path='/register/patient' element={
            <Suspense fallback={<Loading />}>
              <h1>Registo</h1>
            </Suspense>
          }/>
      </Routes>
      <NavBar/>
    </>
  )
}

export default App
