import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CountryDetailsPage from './pages/CountryDetailsPage';
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Effect to set the dark mode preference in local storage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Effect to check for dark mode preference in local storage on component mount
  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode);
    }
  }, []);

  return (
    <div className={darkMode ? 'dark-mode' : 'normal-mode'}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/countryDetails/:alpha3Code' element={<CountryDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
