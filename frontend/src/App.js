
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import { NoteProvider } from './context/NoteContext';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar/>
          <Home/>    
        </div>
      )
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar/>
          <About/>
        </div>
      )
    }
  ]);

  
  return (
   <div>
    
    <RouterProvider router={router}/>
    
   </div>
  );
}

export default App;
