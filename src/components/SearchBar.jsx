import React from 'react'
import './SearchBar.css'

function SearchBar({ setSearchTerm }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search for a country...'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='none'
        inputMode='search'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchBar