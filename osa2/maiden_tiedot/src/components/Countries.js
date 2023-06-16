import { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ showOneCountry, searchCountry, countries }) => {

    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        setWeatherData({});
    }, [searchCountry]);

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));
    if (searchCountry && filteredCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (searchCountry && filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            filteredCountries.map(country => {
                return (
                    <div key={country.name.common}>
                        {country.name.common} <button onClick={() => {showOneCountry(country); setWeatherData({})}}>show</button>
                    </div>
                )
            })
        )
    } else if (filteredCountries.length === 1) {
        const country = filteredCountries[0];
        const api_key = process.env.REACT_APP_API_KEY;
    
        if (Object.keys(weatherData).length === 0) {
            axios
            .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}&units=metric`)
            .then(response => setWeatherData(response.data.current));
            return null;
        }

        console.log(weatherData);
        const imgUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        return(
            <div>
                <h2>
                    {country.name.common}
                </h2>
                capital {country.capital}<br/>
                area {country.area}
                <br/>
                <br/>
                <b>languages:</b>
                <ul>
                    {Object.values(country.languages).map(language => 
                            <li key={language}>{language}</li>
                    )}
                </ul>
                <div className="flag">
                    {country.flag}
                </div>
                <h3>Weather in {country.capital}</h3>
                temperature {weatherData.temp} Celsius<br/>
                <img src={imgUrl} alt='' /><br/>
                wind {weatherData.wind_speed} m/s
            </div>
        )
    }
};

export default Countries;