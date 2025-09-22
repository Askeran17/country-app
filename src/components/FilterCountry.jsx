import React from 'react'
import CustomSelect from './CustomSelect'

function FilterCountry({ value, onselect }) {
  const continents = [
    { id: 0, name: 'all', label: 'All Regions' },
    { id: 1, name: 'Asia' },
    { id: 2, name: 'Africa' },
    { id: 3, name: 'North America' },
    { id: 4, name: 'South America' },
    { id: 5, name: 'Europe' },
    { id: 6, name: 'Oceania' },
    { id: 7, name: 'Antarctic' },
  ];

  const options = continents.map((c) => ({
    value: c.name,
    label: c.label || c.name,
  }));

  return (
    <CustomSelect
      className="select"
      options={options}
      value={value}
      onChange={(val) => onselect(val)}
      placeholder="All Regions"
    />
  );
}

export default FilterCountry