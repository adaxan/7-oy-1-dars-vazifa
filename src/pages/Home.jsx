import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { useNavigate, useLocation } from "react-router-dom";
import "react-responsive-pagination/themes/classic.css";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(30);
  const [image, setImage] = useState([]);
  const [limit, setLimit] = useState(8);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [location]);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setImage(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage, limit]);

  function handleChangePagination(page) {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  }

  function handAbout(e) {
    e.preventDefault()
    navigate("/about")
  }

  return (
    <div className="bg-pink-500 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg p-8 max-w-7xl w-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Food Blog</h1>
          <p className="text-gray-500 mb-8 w-1/2 mx-auto">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur.
          </p>
          <div className="container flex flex-wrap justify-center gap-6 mb-8">
            {image.length > 0 &&
              image.map(function (img, index) {
                return (
                  <div key={index} className="w-full sm:w-1/2 md:w-1/5">
                    <img
                      className="rounded-lg w-full"
                      src={img.url}
                      defaultImg={img.thubnailUrl}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={handleChangePagination}
            maxWidth={500}
          />
          <button onClick={handAbout} className="mt-10 cursor-pointer bg-purple-700 text-white p-5 rounded-md w-40 hover:scale-95 transition">About</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
