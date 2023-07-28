import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function CountryDetailsPage() {
  const [countryDetails, setCountryDetails] = useState(null)
  const { alpha3Code } = useParams()

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`
        )
        setCountryDetails(response.data)
      } catch (error) {
        console.error('Error fetching country details:', error)
      }
    }

    fetchCountryDetails()
  }, [alpha3Code])

  if (!countryDetails) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{countryDetails.name.official}</h1>
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
        alt={countryDetails.name.official}
      />
      <p>Capital: {countryDetails.capital}</p>
      <p>Area: {countryDetails.area}</p>
    </div>
  )
}

export default CountryDetailsPage
