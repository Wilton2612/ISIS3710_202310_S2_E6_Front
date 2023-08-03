import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import './Nav.css';

import LogoIniciSesion from '../../assets/images/lapiz.png';

export default function Nav() {
 

  const isAuthenticated = () => {
    const token = sessionStorage.getItem("token");
    return !!token; // Retorna true si hay un token, de lo contrario retorna false
  };

 

  return (
    <nav className="nav">
      <div className="nav__logo">
        <img src={LogoIniciSesion} alt="Logo" className="logo_inicio_sesion" />
        <p> NoteU</p>
      </div>
      <ul aria-label="menu" className="nav__links" id="links">

        {isAuthenticated() && (
          <><li className="nav__link">
            <NavLink to="/home" className="nav_li">
            <FormattedMessage id="home" />
            </NavLink>
            <span className="nav__link-bar nav__link-bar--green"></span>
          </li>
            <li className="nav__link">
              <NavLink to="/notes"  className="nav_li">
              <FormattedMessage id="notes" />
              </NavLink>
              <span className="nav__link-bar nav__link-bar--blue"></span>
            </li>
            <li className="nav__link">
              <NavLink to="/courses" className="nav_li">
              <FormattedMessage id="courses" />
              </NavLink>
              <span className="nav__link-bar nav__link-bar--blue"></span>
            </li>
            <li>
              <NavLink to="/profile">
                <button className={"btn"}><FormattedMessage id="profile" /></button>
              </NavLink>
            </li>
           
          </>
        )}
        {!isAuthenticated() && (
          <>
            <li>
              <NavLink to="/login" className="nav_li">
              <FormattedMessage id="log_in" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="nav_li">
              <FormattedMessage id="sign_up" />
              </NavLink>
            </li>
            <Outlet />
          </>
        )}
      </ul>
    </nav>
  );
}
