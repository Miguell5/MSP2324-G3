import { useState } from 'react'
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";


function Teste() {

  return (
    <>
      <h1>Vite + React</h1>
      <NavLink  to={"/register/patient"}>  
        <Button variant="outlined">Outlined</Button>
      </NavLink>
      
      
    </>
  )
}

export default Teste
