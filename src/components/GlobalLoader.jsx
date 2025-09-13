import { useSelector } from 'react-redux'
import styles from './GlobalLoader.module.css'

function GlobalLoader() {
  const isLoading = useSelector((state) => state.loader.isLoading)

  if (!isLoading) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default GlobalLoader
