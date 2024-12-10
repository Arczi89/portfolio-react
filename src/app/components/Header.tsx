import React from "react";
import styles from "../styles/header.module.scss";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const locationPaths = [
    { url: "/", text: "Profil"},
    { url: "/contact", text: "Kontakt"},
    { url: "/interests", text: "Zainteresowania"},
  ];
  return (
    <header className={`${styles.header}`}>
      <Logo />
      <nav>
        {locationPaths.map(path => {
          return (<button key={path.url}
            className={`btn btn--nav ${location.pathname === path.url ? "active" : ""}`}
          >
            <Link to={path.url} className={styles.navLink}>
              {path.text}
            </Link>
          </button>)
        })}
      </nav>
    </header>
  );
};

export default Header;
