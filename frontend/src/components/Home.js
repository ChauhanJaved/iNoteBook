import React from 'react'
import { useEffect } from 'react'
import Notes from './Notes'

export const Home = () => {
  let login = false;
  useEffect(() => {
    if(localStorage.getItem('token')){
      login = true;
    } 
    else{
      login = false;
    }     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  return (
    login ? (
      <div>        
        <Notes/>
      </div> 
    ): (
      <div className="container my-3">
        <h1>Wellcome to iNotebook</h1>
      </div>
    ) 
  )
}
