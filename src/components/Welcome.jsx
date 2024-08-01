import React from 'react';
import Styles from "./Welcome.module.css";

const Welcome = ({onButton}) => {
  return (
    <div className={Styles.wrapper}>
        <p className={Styles.title}>
          Make a reservation call. <br />
          In <span className={Styles.highlight}>any</span> country.
        </p>
        <p className={Styles.text}>
            Many restaurants still require us to call them to make a reservation. <br />
            And that sucks. Let's face it, who likes making phone calls? <br /><br />
            <span className={Styles.highlight}>But wait... we live in an age of AI, right??</span><br /><br />
            So we thought, why not have AI make that call for us? In any language of our choice?<br/><br />
            <span className={Styles.warning}>(We're not joking, it will make a real phone call. So don't play with real numbers.)</span>
        </p>
        <button className={Styles.button} onClick={onButton}>Let's go</button>
    </div>
  )
};
export default Welcome;