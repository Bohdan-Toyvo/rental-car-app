import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material' // залишимо для майбутнього MUI
import Header from './components/Header'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CarDetails from './pages/CarDetails'
import GlobalLoader from './components/GlobalLoader' // 🆕

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <GlobalLoader /> {/* 🆕 Глобальний лоадер */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  )
}

export default App