import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import styles from '@/styles/SwapButton.module.css'

interface SwapButtonProps {
    handleClick: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({ handleClick }) => {
    return (
        <>
            <button type="button" onClick={handleClick}><FontAwesomeIcon icon={faArrowsRotate} className={styles.swapButton} size="3x" /></button>

        </>
    )
}

export default SwapButton;