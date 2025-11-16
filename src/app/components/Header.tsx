import React from 'react';
import styles from '../styles/header.module.scss';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const locationPaths = [
    { url: '/', text: 'Profil' },
    { url: '/contact', text: 'Kontakt' },
    { url: '/interests', text: 'Zainteresowania' },
  ];

  return (
    <header data-testid="header" className={`${styles.header}`}>
      <Logo />
      <nav>
        {locationPaths.map(path => {
          const isActive = location.pathname === path.url;
          return (
            <Link
              key={path.url}
              to={path.url}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {path.text}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
