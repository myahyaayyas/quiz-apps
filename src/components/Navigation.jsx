import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navigation({ logout, name }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale, theme, toggleTheme }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <button className="toggle-theme" onClick={toggleTheme}>
                  {theme === "light" ? <FaMoon /> : <FaSun />}
                </button>
              </li>
              <li>
                <button className="toggle-locale" onClick={toggleLocale}>
                  {locale === "id" ? "en" : "id"}
                </button>
              </li>
              <li>
                <Link to="/arsip">{locale === "id" ? "Arsip" : "Archive"}</Link>
              </li>
              <li>
                <button className="toggle-locale" onClick={logout}>
                  <FiLogOut /> {name}
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
