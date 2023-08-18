import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NoteProvider } from "./context/NoteContext";
import { AlertProvider } from "./context/AlertContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Alert/>
          <div className="container">
            <Home />
          </div>
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar />
          <Alert />
          <div className="container">
            <About />
          </div>
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Navbar />          
          <Alert />
          <div className="container">
            <Login /> 
          </div>
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <Navbar />
          <Alert />
          <div className="container">
           <Signup />                      
          </div>
        </div>
      ),
    }
  ]);

  return (
    <div>
      <AlertProvider>        
        <NoteProvider>
          <RouterProvider router={router} />
        </NoteProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
