import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCarById } from '../services/api'
import styles from './CarDetails.module.css'
import { useDispatch } from 'react-redux' 
import { setLoading } from '../redux/loaderSlice'
import formatMileage from '../utils/formatMileage'

function CarDetails() {
  const { id } = useParams()
  const dispatch = useDispatch() 
  const [car, setCar] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        dispatch(setLoading(true)) 

        const data = await getCarById(id)
        setCar(data)
      } catch (err) {
        setError('Failed to load car details')
        console.error(err) 
      } finally {
        dispatch(setLoading(false))
      }
    }

    fetchCar()
  }, [id, dispatch]) 

  if (error) return <div>Error: {error}</div> // 🆕 показуємо помилку
  if (!car) return null // 🆕 поки дані не завантажені

  return (
    <div className={styles.details}>
      <h1>{car.make} {car.model}</h1>
      <img src={car.img} alt={`${car.make} ${car.model}`} className={styles.carImage} />
      <p>Price: ${car.rentalPrice}/day</p>
      <p>Year: {car.year}</p>
      <p>Type: {car.type}</p>
      <p>Fuel: {car.fuelConsumption}</p>
      <p>Engine: {car.engineSize}</p>
      <p>Mileage: {formatMileage(car.mileage)} km</p> {/* 🆕 форматований пробіг */}
      <p>Description: {car.description}</p>
    </div>
  )
}

export default CarDetails