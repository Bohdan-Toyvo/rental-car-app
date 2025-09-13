import { useNavigate } from 'react-router-dom'
import './Header.module.css'

function Header() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <h2 className="logo">RentalCar</h2>
      
      <nav className="nav">
        <button className="nav-button" onClick={() => navigate('/')}>
          Home
        </button>
        <button className="nav-button" onClick={() => navigate('/catalog')}>
          Catalog
        </button>
      </nav>
    </header>
  )
}

export default Header