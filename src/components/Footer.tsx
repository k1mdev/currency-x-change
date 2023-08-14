import React from "react";
import styles from '../styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '200'
})

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {

  return (
    <>
      <footer className={styles.footer}>

        <section className="footer-section">
          <h1 className={`${styles.name} ${montserrat.className}`}>Emmanuel</h1>
          <ul className={styles.list}>
            <li className={styles.gap}>
              <a className={styles.link}
                href="https://github.com/k1mdev" target="_blank" rel="noopener">
                <FontAwesomeIcon icon={faGithub} /> {" "}
                GitHub
              </a>
            </li>
          </ul>
        </section>

        <section className="footer-section">
          <h1 className={`${styles.name} ${montserrat.className}`}>Jason</h1>
          <ul className={styles.list}>
            
            <li className={styles.gap}>
              <a className={styles.link}
                href="https://github.com/khazixi" target="_blank" rel="noopener">
                <FontAwesomeIcon icon={faGithub} /> {" "}
                GitHub
              </a>
            </li>

            <li>
              <a className={styles.link}
                href="https://www.linkedin.com/in/jason-simmonds-a72806263" target="_blank" rel="noopener">
                 <FontAwesomeIcon icon={faLinkedin} /> {" "}
                LinkedIn
              </a>
            </li>

          </ul>
        </section>

      </footer>
    </>
  )

}

export default Footer;
