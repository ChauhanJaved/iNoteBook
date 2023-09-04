import React from 'react'
import { useEffect, useState  } from 'react'
import Notes from './Notes'
import { Link } from "react-router-dom";

export const Home = () => {
  const [login, setLogin] = useState(false);   
  useEffect(() => {
    if(localStorage.getItem('token')){
      setLogin(true);
    } 
    else{
      setLogin(false);
    }     
    console.log(login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    login ? (
      <div>        
        <Notes/>
      </div> 
    ): (
      <div className="container my-3 text-center">
        <h1>Wellcome to iNotebook</h1>
        <h4>The one place for all your notes.</h4>
        <Link type='button' className="btn btn-primary btn-lg my-3" to='/signup'>Sign up for free</Link>
        <p>Already have an account? <Link className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" to='/login'>Log in</Link></p>
      </div>
    ) 
  )
}
