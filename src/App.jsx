import './App.css'
import { useEffect, useState } from 'react'
import CountryList from './components/CountryList.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterCountry from './components/FilterCountry.jsx'
import SortDropDown from './components/SortDropDown.jsx'

const API_URL = "https://restcountries.com/v3.1";

function App() {
const [countries, setCountries] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [sortOrder, setSortOrder] = useState("asc");


 useEffect(() => {
   fetchCountries()
 }, []);

const fetchCountries = async () => {
     try {
      const response = await fetch( `${API_URL}/all?fields=name,cca2,capital,region,flags,population` );
      const data = await response.json();


     if (data) setCountries(data);
     } catch (error) {
       console.log(error);
     }
   }


  const filterCountries = countries.filter((country) =>
     country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
   return sortOrder === "asc"
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common);
  });

  const getCountryByRegion = async (regionName) => {
    try {
      if (regionName === "all") return fetchCountries();
      const resp = await fetch(`${API_URL}/region/${regionName}?fields=name,cca2,capital,region,flags,population`);
      const data = await resp.json();
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  }

  return (
      <div className="App">
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className='sort-filter'>
          <FilterCountry onselect={getCountryByRegion} />
          <SortDropDown sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
        <CountryList countries={filterCountries} />
      </div>
  )
}

export default App
