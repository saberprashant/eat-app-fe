import { useState } from 'react'
import './App.css'
import RestaurantView from './components/RestaurantView'
import { useEffect } from 'react'

function App() {
  const restaurantsUrl = 'https://api.eat-sandbox.co/public/v2/restaurants/14bf9273-64f3-4b39-875b-a616fc83f453';
  const [restaurant, setRestaurant] = useState({});
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetch(restaurantsUrl)
    .then(res => res.json())
    .then((val) => {
      setRestaurant(val.data);
    });
  }, []);

  const fetchSlots = (form) => {
    console.log(form);
    const slotsUrl = `https://api.eat-sandbox.co/public/v2/restaurants/14bf9273-64f3-4b39-875b-a616fc83f453/time_slots?desired_time_and_date=${form.date}T${form.time}&covers=${form.pax}`;
    fetch(slotsUrl)
    .then(res => res.json())
    .then((val) => {
      setSlots(val.data);
    });
  }

  return (
    <>
      <h1 className='title'>Eat App</h1>
      <RestaurantView restaurant={restaurant} slots={slots} fetchSlots={fetchSlots}/>
    </>
  )
}

export default App
