import { useEffect, useState } from 'react';
import axios from 'axios';
import Countries from "./components/Countries"

const App = () => {

  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data));
  }, []);

  const handleChange = (event) => {
    setSearchCountry(event.target.value);
  };

  const showOneCountry = (country) => {
    setCountries([country]);
  };

  const reset = () => {
    setSearchCountry('');
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data));
  };

  return (
    <div>
      find countries <input value={searchCountry} onChange={handleChange} />
      <Countries searchCountry={searchCountry} countries={countries} showOneCountry={showOneCountry} />
      <br />
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default App;
