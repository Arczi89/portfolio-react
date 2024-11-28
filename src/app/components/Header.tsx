import React from "react";
import styles from "../styles/header.module.scss";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <header className={`${styles.header}`}>
      <Logo />
      <nav>
        <button
          className={`btn btn--nav ${location.pathname === "/" ? "active" : ""}`}
        >
          <Link to="/" className={styles.navLink}>
            Profil
          </Link>
        </button>
        <button
          className={`btn btn--nav ${location.pathname === "/contact" ? "active" : ""}`}
        >
          <Link to="/contact" className={styles.navLink}>
            Kontakt
          </Link>
        </button>
        <button
          className={`btn btn--nav ${location.pathname === "/interests" ? "active" : ""}`}
        >
          <Link to="/interests" className={styles.navLink}>
            Zainteresowania
          </Link>
        </button>
      </nav>
    </header>
  );
};

export default Header;
