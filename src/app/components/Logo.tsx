import React from "react";
import styles from "../styles/logo.module.scss";

const Logo: React.FC = () => {
  return (
    <div className="container mx-auto text-center">
      <h1 className={styles.logo}>
        <div className={styles.animated}>&lt;szwagrzak_pl/&gt;</div>
      </h1>
    </div>
  );
};

export default Logo;
