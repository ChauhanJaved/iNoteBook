import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NoteProvider } from "./context/NoteContext";

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
