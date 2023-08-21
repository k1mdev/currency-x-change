import React, { useState } from "react"
import styles from '@/styles/SwapButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'


interface SwapButtonProps {
  handleSwap: () => void
}

const SwapButton: React.FC<SwapButtonProps> = ({ handleSwap }) => {
  const [rotate, setRotate] = useState(false)
  function animate() {
    setRotate(true)
    setTimeout(() => setRotate(false), 500)
  }
  return (
    <div className={styles.container}>
      <button type="button" onClick={() => {handleSwap(); animate()}} className={`${styles.swapButton} ${(rotate) ? styles.button : ""}`}>
        <FontAwesomeIcon icon={faArrowsRotate} size="3x" />
      </button>
    </div>
  )
}

export default SwapButton;
