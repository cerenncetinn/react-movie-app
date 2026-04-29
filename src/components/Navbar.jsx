import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


export default function Navbar() {
const { theme, setTheme } = useContext(ThemeContext);
const  {watchList} =useContext(UserContext);

  return (
    <nav className={`navbar bg-${theme}`} data-bs-theme={theme}>
      <ThemeSelector />
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Logo />

        {/* Menü */}
        <ul className="navbar-nav d-flex flex-row gap-3">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>

           <ul className="navbar-nav ms-auto d-flex flex-row gap-3">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>

          <li className="nav-item ">
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        </ul>
        <SearchForm />
        <Link to="/watchlist" className= {`btn btn-${theme} border position-relative ms-1`}>
         
        
        <i className="bi bi-heart-fill"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {watchList.length}
        </span>
        </Link>
        

      </div>
    </nav>
  );
}
