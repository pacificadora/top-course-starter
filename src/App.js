import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {filterData, apiUrl} from "./data"
import { toast } from "react-toastify";
const App = () => {

  const [courses, setCourses] = useState(null);

  useEffect( () => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const cardData = await res.json()
        setCourses(cardData.data)
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, [])
  return (
  <div>
    <Navbar></Navbar>
    <Filter filterData={filterData}></Filter>
    <Cards courses={courses}></Cards>
  </div>);
};

export default App;
