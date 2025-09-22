import React from 'react'
import CustomSelect from './CustomSelect'

function SortDropDown({ sortOrder, onSortChange }) {
  const options = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];
  return (
    <CustomSelect
      className="select"
      options={options}
      value={sortOrder}
      onChange={(val) => onSortChange({ target: { value: val } })}
      placeholder="Sort"
    />
  );
}

export default SortDropDown;