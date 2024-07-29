import React from 'react';
import {Link } from 'react-router-dom';
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={Styles.wrapper}>
        <Link to="/" className={Styles.title}>BOOK FOR ME 🤙</Link>
        <div className={Styles.links}>
          <Link to="/" className={Styles.link}>Home</Link>
          <Link to="/about" className={Styles.link}>About</Link>
        </div>
    </div>
  )
};
export default Header;