import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function HomePage() {
  const [countriesData, setCountriesData] = useState([])
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await axios.get('https://ih-countries-api.herokuapp.com/countries')
        console.log(response.data[0].name)
        setCountriesData(response.data)
        console.log('countries', response.data)
      } catch (error) {
        console.error('Error fetching countries data:', error)
      }
    }

    fetchCountriesData()
  }, [])
  return (
    <div>
      <h1>WikiCountries: Your Guide to the World</h1>
      <ul>
        {countriesData.map(country => (
          <li key={country.alpha3Code}>
            <Link to={`/countryDetails/${country.alpha3Code}`}>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt={country.name.official}
              />
              {country.name.official}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
