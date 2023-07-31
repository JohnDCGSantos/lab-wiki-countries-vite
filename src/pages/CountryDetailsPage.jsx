import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import '../CountryDetailsPage.css'

function CountryDetailsPage() {
  const [countryDetails, setCountryDetails] = useState(null)
  const { alpha3Code } = useParams()
  const [borderCountries, setBorderCountries] = useState([]); 

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`
        )
        setCountryDetails(response.data)
        fetchBorderCountries(response.data.borders); 
      } catch (error) {
        console.error('Error fetching country details:', error)
      }
    }

    fetchCountryDetails()
  }, [alpha3Code])

  const fetchBorderCountries = async (borderCodes) => {
    try {
      const borderPromises = borderCodes.map(async (borderCode) => {
        const response = await axios.get(
          `https://ih-countries-api.herokuapp.com/countries/${borderCode}`
        );
        return response.data;
      });

      const borderCountriesData = await Promise.all(borderPromises);
      setBorderCountries(borderCountriesData);
    } catch (error) {
      console.error('Error fetching bordering country details:', error);
    }
  };

  if (!countryDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="country-details-container">
      <h1 className="country-name">{countryDetails.name.common}</h1>
      <img className="country-flag"
        src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`}
        alt={countryDetails.name.official}
      />
      <div className="country-info-divider" />
      <p className="country-info">Capital: {countryDetails.capital}</p>
      <div className="country-info-divider" />
      <p className="country-info">Area: {countryDetails.area} km²</p>
      <div className="country-info-divider" />
      {countryDetails.borders.length > 0 ? (
        <div className="country-borders">
        <h2>Bordering Countries:</h2>
          <ul>
          {borderCountries.map((borderCountry) => (
              <li key={borderCountry.alpha3Code}>
                <Link to={`/countryDetails/${borderCountry.alpha3Code}`}>
                  {borderCountry.name.common}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bordering countries found.</p>
      )}
    <button className="back-button" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
      }

export default CountryDetailsPage
