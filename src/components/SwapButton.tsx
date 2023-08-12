import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import styles from '@/styles/SwapButton.module.css'

interface SwapButtonProps {
    handleClick: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({ handleClick }) => {
    return (
        <div className={styles.container}>
            <button type="button" onClick={handleClick} className={styles.swapButton}><FontAwesomeIcon icon={faArrowsRotate} size="3x" /></button>
            
        </div>
    )
}

export default SwapButton;