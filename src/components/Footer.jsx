import React from 'react';
import Styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={Styles.wrapper}>
        Made with love at
      <a
        href="https://duhhh.co"
        className={Styles.link}
        target="_blank"
        rel="noreferrer"
      >
        duhhh
      </a>
    </div>
  )
};
export default Footer;