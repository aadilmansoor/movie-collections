import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import MovieCard from "./MovieCard";

const SearchResults = ({ searchText }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieResult, setMovieResult] = useState([]);
  console.log(movieResult);

  const options = {
    method: "GET",
    url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchText}`,
    params: {
      exact: "false",
      titleType: "movie",
      limit: 15,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_X_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_X_RAPID_API_HOST,
    },
  };

  useEffect(() => {
    const searchResults = async () => {
      try {
        setIsLoading(true);
        const response = await axios.request(options);
        const result = await response?.data?.results;
        const filterResult = result?.filter(
          (movie) => movie.primaryImage !== null
        );
        setMovieResult(filterResult);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    searchResults();
  }, [searchText]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {movieResult?.length > 0 ? (
            <>
              <h2 className="h3-bold md:h2-bold text-center my-6">{`Search results for "${searchText}"`}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full place-items-center mb-12">
                {movieResult?.map(
                  ({ id, primaryImage, originalTitleText, releaseYear }) => {
                    return (
                      <MovieCard
                        key={id}
                        id={id}
                        imageUrl={primaryImage?.url}
                        title={originalTitleText?.text}
                        year={releaseYear?.year}
                      />
                    );
                  }
                )}
              </div>
            </>
          ) : (
            <div>No results found</div>
          )}
        </>
      )}
    </div>
  );
};
export default SearchResults;
