import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function About() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=5`);
        const fetchedData = await res.json();
        setData((prev) => [...prev, ...fetchedData]); 
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);
  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentHeight = document.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && !loading) { 
        setPage((prevPage) => prevPage + 1);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  function handleHome(event) {
    event.preventDefault();
    navigate("/")
  }

  return (
    <div className='container mx-auto mt-10'>
      <button className="mb-5 mr-5 cursor-pointer bg-purple-700 text-white p-5 rounded-md w-40 hover:scale-95 transition" onClick={handleHome}>Home</button>
      <div className='container flex flex-wrap justify-center gap-6 mb-8'>
        {data.length > 0 && data.map((value, index) => (
          <div key={index} className='w-full sm:w-1/2 md:w-1/5'>
            <img className='rounded-lg w-full' src={value.thumbnailUrl} alt="Thumbnail" />
          </div>
        ))}
      </div>
      {loading && <div className="text-center my-4">Loading...</div>}
    </div>
  );
}

export default About;
