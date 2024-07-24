import React from 'react';
import {Link } from 'react-router-dom';
import Styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={Styles.wrapper}>
        <span>BOOK FOR ME 🤖</span>
        <div className={Styles.links}>
          <Link to="/" className={Styles.link}>Home</Link>
          <Link to="/about" className={Styles.link}>About</Link>
        </div>
    </div>
  )
};
export default Header;