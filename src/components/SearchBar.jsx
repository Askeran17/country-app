import React from 'react'
import './SearchBar.css'

function SearchBar({ setSearchTerm }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search for a country...'
        inputMode='text'
        autoComplete='off'
        autoCorrect='off'
        spellCheck={false}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )
}

export default SearchBar