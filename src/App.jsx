import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CountryDetailsPage from './pages/CountryDetailsPage'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/countryDetails/:alpha3Code' element={<CountryDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
