import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NoteProvider } from "./context/NoteContext";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
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
          <div className="container">
           <Signup />                      
          </div>
        </div>
      ),
    }
  ]);

  return (
    <div>
      <NoteProvider>
        <RouterProvider router={router} />
      </NoteProvider>
    </div>
  );
}

export default App;
