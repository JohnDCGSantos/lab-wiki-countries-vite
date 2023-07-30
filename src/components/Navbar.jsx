import { Link } from 'react-router-dom'
function Navbar({ toggleDarkMode, darkMode }) {
  return (
    <nav>
      <Link to="/">
      <h1>WikiCountries</h1>
      </Link>
      <div className="toggle-container">
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Normal Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
