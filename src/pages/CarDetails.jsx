import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarById } from "../services/api";
import styles from "./CarDetails.module.css";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/loaderSlice";
import formatMileage from "../utils/formatMileage";
import formatAddress from "../utils/formatAddress";

function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getCarById(id);
        setCar(data);
      } catch (err) {
        setError("Failed to load car details");
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCar();
  }, [id, dispatch]);

  if (error) return <div>Error: {error}</div>;
  if (!car) return null;

  return (
    <div className={styles.details}>
      {/* 🖼 Фото авто */}
      <img
        src={car.img}
        alt={`${car.make} ${car.model}`}
        className={styles.carImage}
      />

      {/* 📋 Основна інформація */}
      <h1>
        {car.make} {car.model}
      </h1>
      <p>
        <strong>Location:</strong> {formatAddress(car.address)}
      </p>
      <p>
        <strong>Price:</strong> ${car.rentalPrice}/day
      </p>
      <p>
        <strong>Description:</strong> {car.description}
      </p>

      {/* 📦 Rental Conditions */}
      <div className={styles.conditions}>
        <h2>Rental Conditions</h2>
        <ul>
          <li>Minimum age: {car.rentalConditions?.minAge || 25}</li>
          <li>No smoking</li>
          <li>Valid driver’s license</li>
        </ul>
      </div>

      {/* ⚙️ Характеристики авто */}
      <div className={styles.specs}>
        <h2>Specifications</h2>
        <ul>
          <li>Year: {car.year}</li>
          <li>Type: {car.type}</li>
          <li>Fuel Consumption: {car.fuelConsumption} l/100 km</li>
          <li>Engine Size: {car.engineSize}</li>
          <li>Mileage: {formatMileage(car.mileage)} km</li>
        </ul>
      </div>

      {/* 🎧 Аксесуари */}
      <div className={styles.accessories}>
        <h2>Accessories</h2>
        <ul>
          {car.accessories?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 🧠 Функціональність */}
      <div className={styles.functionalities}>
        <h2>Functionalities</h2>
        <ul>
          {car.functionalities?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* 📅 Форма бронювання (тільки логіка, без стилів) */}
      <div className={styles.bookingForm}>
        <h2>Book this car</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="date" required />
          <textarea placeholder="Comment" rows="4" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default CarDetails;
