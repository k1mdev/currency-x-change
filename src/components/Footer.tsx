import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub } from "@fortawesome/free-solid-svg-icons";


const Footer: React.FC = () => {

    return (
        <>


                <section className="footer-section">
                    <h1>Emmanuel K</h1>
                    <nav>
                        <ul>
                            <FontAwesomeIcon icon={faSquareGithub} />
                            <li><a>LinkedIn</a></li>
                            <li><a>GitHub</a></li>
                        </ul>
                    </nav>
                </section>

                <section className="footer-section">
                    <h1>Jason S</h1>
                    <nav>
                        <ul>
                            <li><a>LinkedIn</a></li>
                            <li><a>GitHub</a></li>
                        </ul>
                    </nav>
                </section>

        </>
    )

}

export default Footer;