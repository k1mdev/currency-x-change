import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/Footer.module.css'
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";


const Footer: React.FC = () => {

  return (
    <>
      <footer className={styles.footer}>
        <section className="footer-section">
          <h1>Emmanuel</h1>
          <ul className={styles.list}>
            <li>
              <a className={styles.link}
                href="#">
                <FontAwesomeIcon icon={faGithub} /> {" "}
                GitHub
              </a>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h1>Jason S</h1>
          <ul className={styles.list}>
            <li className={styles.gap}>
              <a className={styles.link}
                href="https://www.linkedin.com/in/jason-simmonds-a72806263" target="_blank" rel="noopener">
                 <FontAwesomeIcon icon={faLinkedin} /> {" "}
                LinkedIn
              </a>
            </li>
            <li>
              <a className={styles.link}
                href="https://github.com/khazixi" target="_blank" rel="noopener">
                <FontAwesomeIcon icon={faGithub} /> {" "}
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </>
  )

}

export default Footer;
