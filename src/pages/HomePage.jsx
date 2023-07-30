import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../HomePage.css';

function HomePage() {
  const [countriesData, setCountriesData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [originalCountriesData, setOriginalCountriesData] = useState([]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await axios.get('https://ih-countries-api.herokuapp.com/countries');
        const sortedCountries = response.data.sort((a, b) =>
          a.name.official.localeCompare(b.name.official)
        );
        setCountriesData(sortedCountries);
        setOriginalCountriesData(sortedCountries);
        console.log('countries', response.data);
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchCountriesData();
  }, []);

  useEffect(() => {
    const filteredCountries = originalCountriesData.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredCountries);
  }, [searchTerm, originalCountriesData]);

  const handleSort = () => {
    const sortedCountries =
      sortOrder === 'asc'
        ? [...countriesData].sort((a, b) => b.name.official.localeCompare(a.name.official))
        : [...countriesData].sort((a, b) => a.name.official.localeCompare(b.name.official));

    setCountriesData(sortedCountries);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (event) => {
    event.preventDefault();
   
  };

  const countriesToDisplay = searchTerm ? searchResults : countriesData;

  return (
    <div>
      <h1 className="home-tittle">WikiCountries: Your Guide to the World</h1>
      <form onSubmit={handleSearch}>
        <h3>Search countries by name:</h3>
        <input className='search-bar'
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search countries by name..."
        />
        
      </form>
      <button className="sort-button" onClick={handleSort}>
        {sortOrder === 'asc' ? 'Sort by Reverse Name' : 'Sort by Name'}
      </button>

      <div className="country-list">
        <ul>
          {countriesToDisplay.map((country) => (
            <li key={country.alpha3Code}>
              <div className="country-box">
                <Link to={`/countryDetails/${country.alpha3Code}`}>
                  <img
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                    alt={country.name.official}
                  />
                </Link>
                <div className="country-name">
                  <Link to={`/countryDetails/${country.alpha3Code}`}>{country.name.official}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
