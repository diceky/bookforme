import React from 'react';
import Styles from "./Welcome.module.css";

const Welcome = ({onButton}) => {
  return (
    <>
        <p className={Styles.title}>Make a reservation call. In any language.</p>
        <p className={Styles.text}>
            Many restaurants still require us to call them to make a reservation. <br/>
            And that sucks. Let's face it, who likes making phone calls? Or more like, who still makes phone calls?<br/>
            Even worse, what if you're a tourist and don't speak the local language? <br/><br/>
            But then again... we live in an age of AI, right?<br/>
            So we thought, why not have AI make that call for us? In any language of our choice?<br/>
            This may be the future. This may not be. Who knows.<br/>
            Are YOU ready to have an AI make a first reservation call?<br /><br />
            (We're not joking, it will make a real phone call. So don't play with real numbers.)
        </p>
        <button className={Styles.button} onClick={onButton}>Let's Go</button>
    </>
  )
};
export default Welcome;