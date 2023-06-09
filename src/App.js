import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {filterData, apiUrl} from "./data"
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
const App = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  async function fetchData(){
    setLoading(true)
    try {
      const res = await fetch(apiUrl);
      const cardData = await res.json()
      setCourses(cardData.data)
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect( () => {
    fetchData();
  }, [])
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div><Navbar></Navbar></div>
      <div>
        <div><Filter filterData={filterData} category={category} setCategory={setCategory}></Filter></div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
            loading ? (<Spinner/>) : (<Cards courses={courses} category={category}></Cards>) 
          }
        </div>
      </div>
    </div>
  );
};

export default App;
