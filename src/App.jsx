import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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

  console.log(countries, "countries");

  return (
      <div className="App">
        <h1>Country App</h1>
      </div>
  )
}

export default App
