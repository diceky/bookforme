import React from 'react';
import Styles from "./About.module.css";

const About = () => {
  return (
    <div className={Styles.wrapper}>
        <p className={Styles.title}>What can GenAI do for us? <br/>For real?</p>
        <p className={Styles.text}>At <a href="https://duhhh.co" className={Styles.link} target="_blank" rel="noreferrer">duhhh</a> we're thinking deeply about practical values GenAI can bring to us, beyond assisstants, knowledge bases and fancy multimodality.</p>
        <p className={Styles.text}>One interesting insight we found recently was how GenAI can relieve psychological stress in our daily lives, by having it do tasks that makes us humans think twice.</p>
        <p className={Styles.text}>Making phone calls to restaurants is a perfect example. Especially in cases when you don't speak the local language.</p>
    </div>
  )
}

export default About;