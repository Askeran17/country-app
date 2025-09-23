import React from 'react'

function SortDropDown({ sortOrder, onSortChange }) {
  return (
    <select value={sortOrder} onChange={onSortChange}>
        <option value="asc">Name (A-Z)</option>
        <option value="desc">Name (Z-A)</option>
    </select>
  )
}

export default SortDropDown