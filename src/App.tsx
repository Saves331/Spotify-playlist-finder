import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Callback from "./routes/Callback";
import Search from "./routes/Search";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <BrowserRouter>
     <nav className="flex gap-2 px-6 py-4">
    <NavLink
        to="/"
        end
        className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive 
                    ? "bg-surface text-accent" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            }`
        }
    >
        <FontAwesomeIcon icon={faHouse} />
        Home
    </NavLink>

    <NavLink
        to="/search"
        className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                isActive 
                    ? "bg-surface text-accent" 
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
            }`
        }
    >
        <FontAwesomeIcon icon={faRecordVinyl} />
        Albums
    </NavLink>
</nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


