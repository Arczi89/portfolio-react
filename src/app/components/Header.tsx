import React from 'react';
import styles from '../styles/header.module.scss';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const locationPaths = [
    { url: '/#oferta', text: 'Oferta' },
    { url: '/#realizacje', text: 'Realizacje' },
    { url: '/#konsulting', text: 'Konsulting' },
    { url: '/#kontakt', text: 'Kontakt' },
  ];

  return (
    <header data-testid="header" className={`${styles.header}`}>
      <Logo />
      <nav>
        {locationPaths.map(path => (
          <Link key={path.url} to={path.url} className={styles.navLink}>
            {path.text}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
