import React from 'react'

function FilterCountry({ onselect }) {

  const continents = [
    { id: 1, name: 'Africa' },
    { id: 2, name: 'Asia' },
    { id: 3, name: 'Europe' },
    { id: 4, name: 'North America' },
    { id: 5, name: 'South America' },
    { id: 6, name: 'Oceania' },
    { id: 7, name: 'Antarctic' },
  ];

const selectHandler = (e) => {
  const regionName = e.target.value;
  onselect(regionName);
}

    return (
        <select onChange={selectHandler}>
      <option value="all">All Regions</option>
      {continents.map(continent => {
        return (
          <option value={continent.name} key={continent.id}>
            {continent.name}
          </option>
        );
      })}
        </select>

    );
};

export default FilterCountry