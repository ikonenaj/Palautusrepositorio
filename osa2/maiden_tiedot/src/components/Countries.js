const Countries = ({ searchCountry, countries }) => {
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
                        {country.name.common}
                    </div>
                )
            })
        )
    } else if (searchCountry && filteredCountries.length === 1) {
        const country = filteredCountries[0];
        return(
            <div>
                <h2>
                    {country.name.common}
                </h2>
                capital {country.capital}<br/>
                area {country.area}
                <h3>languages</h3>
                <ul>
                    {Object.values(country.languages).map(language => 
                            <li key={language}>{language}</li>
                    )}
                </ul>
                <div className="flag">
                    {country.flag}
                </div>
            </div>
        )
    }
};

export default Countries;