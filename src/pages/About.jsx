import React from 'react';
import Styles from "./About.module.css";

const About = () => {
  return (
    <div>
        <p className={Styles.title}>Fear no more.</p>
        <p className={Styles.text}>There are many restaurants that still require you to call to book a seat.</p>
        <p className={Styles.text}>For people that don't speak the local language, it makes it very difficult to make a reservation.</p>
        <p className={Styles.text}>So let's have AI make that phone call.</p>
    </div>
  )
}

export default About;