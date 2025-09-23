import React from 'react'
import './CountryCard.css'

function CountryCard({ country, style }) {
  return (
    <div className='country-card' style={style}>
  <img src={country.flags.svg} alt={country.name.common} className='flag' loading="lazy" decoding="async" />
        <div className='country-info'>
            <h2>{country.name.common}</h2>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Capital:</strong> {country.capital}</p>
        </div>
    </div>
  )
}

export default CountryCard