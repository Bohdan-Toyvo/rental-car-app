import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBrand,
  setPrice,
  setMileageFrom,
  setMileageTo,
  resetFilters,
} from "../redux/filtersSlice";
import { getCars, getBrands } from "../services/api";
import styles from "./Catalog.module.css";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../redux/favoritesSlice";
import { setLoading } from "../redux/loaderSlice";
import formatMileage from "../utils/formatMileage";
import formatAddress from '../utils/formatAddress'


function Catalog() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const favorites = useSelector((state) => state.favorites.favoriteIds);

  const [cars, setCars] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [priceOptions, setPriceOptions] = useState([]);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrandOptions(data);
      } catch (err) {
        console.error("Failed to load brands", err);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        dispatch(setLoading(true));

        const query = {};
        if (filters.brand) query.make = filters.brand;
        if (filters.price) query.rentalPrice = filters.price;
        if (filters.mileageFrom) query.mileageFrom = filters.mileageFrom;
        if (filters.mileageTo) query.mileageTo = filters.mileageTo;

        const data = await getCars(query, page, limit);

        setCars(data.cars);
        const uniquePrices = [
          ...new Set(data.cars.map((car) => car.rentalPrice)),
        ].sort((a, b) => a - b);
        setPriceOptions(uniquePrices);
      } catch (err) {
        setError("Failed to load cars");
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCars();
  }, [
    filters.brand,
    filters.price,
    filters.mileageFrom,
    filters.mileageTo,
    page,
    dispatch,
  ]);

  useEffect(() => {
    setPage(1);
  }, [filters.brand, filters.price, filters.mileageFrom, filters.mileageTo]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.catalog}>
      <div className={styles.filterBlock}>
        <label htmlFor="brand">Filter by brand:</label>
        <select
          id="brand"
          value={filters.brand}
          onChange={(e) => dispatch(setBrand(e.target.value))}
        >
          <option value="">All</option>
          {brandOptions.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterBlock}>
        <label htmlFor="price">Filter by price:</label>
        <select
          id="price"
          value={filters.price}
          onChange={(e) => dispatch(setPrice(e.target.value))}
        >
          <option value="">All</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              Up to ${price}/day
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterBlock}>
        <label>Mileage range (km):</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="From"
            value={filters.mileageFrom}
            onChange={(e) => dispatch(setMileageFrom(e.target.value))}
          />
          <input
            type="number"
            placeholder="To"
            value={filters.mileageTo}
            onChange={(e) => dispatch(setMileageTo(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.filterBlock}>
        <button onClick={() => dispatch(resetFilters())}>Reset Filters</button>
      </div>

      <h1>Car Catalog</h1>
      <p>Found {cars.length} cars</p>

      <div className={styles.carsGrid}>
        {cars.map((car) => {
          const isFavorite = favorites.includes(car.id);

          return (
            <div key={car.id} className={styles.carCard}>
              <button
                onClick={() => dispatch(toggleFavorite(car.id))}
                className={styles.favoriteBtn}
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>

              <img
                src={car.img}
                alt={`${car.make} ${car.model}`}
                className={styles.carImage}
              />
              <h3>
                {car.make} {car.model}
              </h3>
              <p>Price: ${car.rentalPrice}/day</p>
              <p>Year: {car.year}</p>
              <p>Type: {car.type}</p>
              <p>Location: {formatAddress(car.address)}</p>

              <p>Mileage: {formatMileage(car.mileage)} km</p>

              <Link to={`/catalog/${car.id}`}>
                <button className={styles.readMore}>Read More</button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={cars.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Catalog;
