import { useEffect, useState } from 'react'
import './App.css'
import CountryList from './components/CountryList.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterCountry from './components/FilterCountry.jsx'
import SortDropDown from './components/SortDropDown.jsx'

const API_URL = "https://restcountries.com/v3.1";

function App() {
const [countries, setCountries] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [sortOrder, setSortOrder] = useState("asc");
const [region, setRegion] = useState("all");


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


  const filterCountries = countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  })
  .sort((a, b) => {
    return sortOrder === "asc"
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common);
  });

  const getCountryByRegion = async (regionName) => {
    try {
      const slug = (regionName || 'all').toLowerCase();
      setRegion(slug);
      if (slug === 'all') return fetchCountries();
      // Handle antarctica alias
      const apiSlug = slug === 'antarctica' ? 'antarctic' : slug;
      const response = await fetch(`${API_URL}/region/${apiSlug}?fields=name,cca2,capital,region,flags,population`);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortChange = (e) => {
    // support both native select event and custom event-like object
    const next = e?.target?.value ?? e;
    setSortOrder(next);
  };

  return (
      <div className="App">
        <SearchBar setSearchTerm={setSearchTerm} />
        <div className='sort-filter'>
          <FilterCountry value={region} onselect={getCountryByRegion} />
          <SortDropDown sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
        <CountryList countries={filterCountries} />
      </div>
  )
}

export default App
