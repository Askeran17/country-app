import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountryList from './components/CountryList.jsx'
import SearchBar from './components/SearchBar.jsx'

const API_URL = "https://restcountries.com/v3.1/all?fields=name,cca2,capital,region,flags,population";

function App() {
const [countries, setCountries] = useState([]);
 useEffect(() => {
   fetchCountries()
 }, []);

const fetchCountries = async () => {
     try {
      const response = await fetch(API_URL);
      const data = await response.json();


     if (data) setCountries(data);
     } catch (error) {
       console.log(error);
     }
   }

  return (
      <div className="App">
        <SearchBar />
        <CountryList countries={countries} />
      </div>
  )
}

export default App
