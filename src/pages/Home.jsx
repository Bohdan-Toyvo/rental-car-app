import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to RentalCar</h1>
        <p className={styles.subtitle}>Find your perfect car for rent</p>
        
        <button 
          className={styles.button}
          onClick={() => navigate('/catalog')}
        >
          View Catalog
        </button>
      </div>
    </div>
  )
}

export default Home