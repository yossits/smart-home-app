import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Home from "./components/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import About from "./components/About.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
