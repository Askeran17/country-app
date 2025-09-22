import React from 'react'
import './CountryList.css'
import CountryCard from './CountryCard';

function CountryList({ countries }) {
  return (
  
  <div className='country-list'>
        {countries.map((country, idx) => {
            return <CountryCard key={idx} country={country} style={{ animationDelay: `${idx * 0.1}s` }} />  
        })}
  </div>
  );
  
}

export default CountryList