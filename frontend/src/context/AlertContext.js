import React, { createContext, useState} from 'react'

export const AlertContext = createContext();

export const AlertProvider = (props) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success"
  })
  const showAlert = (message, type) => {
    setAlert({
        show: true,
        message: message,
        type: type
    })
    setTimeout(() => {
        setAlert({
            ...alert,
            show: false
        })
    }, 1500);    
    }   
  return (
    <AlertContext.Provider value={{alert, showAlert}}>
        {props.children}
    </AlertContext.Provider>    
  )
}
