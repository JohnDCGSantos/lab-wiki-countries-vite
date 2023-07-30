import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../HomePage.css'; 



function HomePage() {
  const [countriesData, setCountriesData] = useState([])
  const [sortOrder, setSortOrder] = useState('asc'); 
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await axios.get('https://ih-countries-api.herokuapp.com/countries')
        const sortedCountries = response.data.sort((a, b) =>
          a.name.official.localeCompare(b.name.official)
        );
        setCountriesData(sortedCountries);
        console.log('countries', response.data)
      } catch (error) {
        console.error('Error fetching countries data:', error)
      }
    }

    fetchCountriesData()
  }, [])

  const handleSort = () => {
    const sortedCountries = [...countriesData].sort((a, b) =>
      sortOrder === 'asc'
        ? a.name.official.localeCompare(b.name.official)
        : b.name.official.localeCompare(a.name.official)
    );
    setCountriesData(sortedCountries);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  return (
    <div>
      <h1 className="home-tittle">WikiCountries: Your Guide to the World</h1>
      <button className='sort-button' onClick={handleSort}>Sort by {sortOrder === 'asc' ? 'Name' : 'Reverse'}</button>

      <div className="country-list">
        <ul>
          {countriesData.map(country => (
            <li key={country.alpha3Code}>
              <div className='country-box'>
                <Link to={`/countryDetails/${country.alpha3Code}`}>
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt={country.name.official}
                  />
                </Link>
                <div className="country-name">
                  <Link to={`/countryDetails/${country.alpha3Code}`}>
                    {country.name.official}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
}
    
  

export default HomePage
