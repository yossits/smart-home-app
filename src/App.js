import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Dashboard from "./components/Dashboard.jsx";
import SignUp from "./components/SignUp.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* הגנה על המסלול */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
