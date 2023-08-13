import React from "react"
import styles from '@/styles/SwapButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'


interface SwapButtonProps {
    handleSwap: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({ handleSwap }) => {
    return (
        <div className={styles.container}>
            <button type="button" onClick={handleSwap} className={styles.swapButton}><FontAwesomeIcon icon={faArrowsRotate} size="3x" /></button>
        </div>
    )
}

export default SwapButton;