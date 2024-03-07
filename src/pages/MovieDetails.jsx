import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const MovieDetails = () => {
  const { id } = useParams();
  console.log(id);

  const [movieData, setMovieData] = useState({});
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  console.log(movieData);

  const options = {
    method: "GET",
    url: `https://moviesdatabase.p.rapidapi.com/titles/${id}`,
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_X_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_X_RAPID_API_HOST,
    },
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.request(options);
        const result = response.data.results;
        setMovieData(result);
        setIsMovieLoading(false);
      } catch (error) {
        console.error(error);
        setIsMovieLoading(false);
      }
    };

    fetchMovieData();
  }, []);

  const { primaryImage, originalTitleText: title, releaseYear } = movieData;

  return (
    <section>
      <Navbar />
      <div className="mt-24 w-full flex justify-center h-full overflow-hidden">
        {isMovieLoading ? (
          <Loader />
        ) : (
          <div className="flex w-full justify-center mx-5 flex-1 flex-wrap">
            <img
              src={primaryImage.url}
              alt={title}
              className="w-[300px] h-[500px] object-cover mt-6"
            />
            <div className="mt-6 text-center h-full flex flex-col justify-center px-6 bg-slate-950">
              <h2 className="h3-bold md:h2-bold">{title.text}</h2>
              <p>{releaseYear.year}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieDetails;
