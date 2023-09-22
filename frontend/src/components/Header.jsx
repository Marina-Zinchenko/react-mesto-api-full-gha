import logo from "../images/logo.svg";
import { Route, Routes, NavLink } from "react-router-dom";

function Header({ onExit, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип МЕСТО" />
      <div className="header__container">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <NavLink to="/sign-up" className="header__link">
                Регистрация
              </NavLink>
            }
          />

          <Route
            path="/sign-up"
            element={
              <NavLink to="/sign-in" className="header__link">
                Войти
              </NavLink>
            }
          />

          <Route
            path="/"
            element={
              <nav className="header__container">
                <p className="header__email">{userEmail}</p>
                <NavLink
                  to="/sign-in"
                  className="header__link"
                  onClick={onExit}
                >
                  Выйти
                </NavLink>
              </nav>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
export default Header;
