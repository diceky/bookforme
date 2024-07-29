import React from 'react';
import Styles from "./About.module.css";

const About = () => {
  return (
    <div className={Styles.wrapper}>
        <p className={Styles.title}>What can GenAI do for us? <br/>For real?</p>
        <iframe className={Styles.gif} src="https://giphy.com/embed/l0MYM5ZAXGvK1KSPK"></iframe>
        <p className={Styles.text}>At <a href="https://duhhh.co" className={Styles.link} target="_blank" rel="noreferrer">duhhh</a> we're thinking deeply about practical values GenAI can bring to us, beyond assisstants, knowledge bases and fancy multimodality.</p>
        <p className={Styles.text}>One interesting insight we found recently was how GenAI can relieve psychological stress in our daily lives, by having it do tasks that makes us humans think twice.</p>
        <p className={Styles.text}>Making phone calls to restaurants is a perfect example. Especially in cases when you don't speak the local language.</p>
        <p className={Styles.text}>This may be the future. This may not be. Who knows.</p>
        <p className={Styles.text}>Are YOU ready to have an AI make a first reservation call?</p>
    </div>
  )
}

export default About;