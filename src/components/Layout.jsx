import React from 'react';
import { Outlet} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={Styles.wrapper}>
     <Header />
     <Outlet/>
     <Footer />
    </div>
   
  )
};
export default Layout;