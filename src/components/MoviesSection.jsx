import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import SearchResults from "./SearchResults";
import { useDebounce } from "@uidotdev/usehooks";

const MoviesSection = () => {
  const [searchText, setSearchText] = useState("");

  const [movieCollection, setMovieCollection] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isShowSearchResults, setIsShowSearchResults] = useState(false);

  const debouncedValue = useDebounce(searchText, 500);

  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: {
      list: "top_rated_english_250",
      sort: "pos.incr",
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_X_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_X_RAPID_API_HOST,
    },
  };

  useEffect(() => {
    if (debouncedValue.length > 0) {
      setIsShowSearchResults(true);
    } else {
      setIsShowSearchResults(false);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (isShowSearchResults) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        setMovieCollection(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-12 flex items-center flex-col gap-6">
      <div className="bg-white rounded-lg max-h-[52px] flex justify-center items-center gap-1 p-2">
        <i className="fa-solid fa-magnifying-glass text-black ms-2 h-full"></i>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="md:w-[500px] p-2 rounded-lg w-full sm:p-0 placeholder:italic placeholder:text-slate-400 focus:outline-none text-black ms-2"
          placeholder="Search movies"
        />
        {/* <button className="bg-[#1F5ABA] p-2 rounded-lg text-white m-2 text-sm">
          Search
        </button> */}
      </div>
      {isShowSearchResults ? (
        <SearchResults searchText={searchText} />
      ) : (
        <>
          <h2 className="h3-bold md:h2-bold text-center">Popular Movies</h2>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full place-items-center">
              {movieCollection?.results?.map(
                ({ id, primaryImage, originalTitleText, releaseYear }) => {
                  return (
                    <MovieCard
                      key={id}
                      id={id}
                      imageUrl={primaryImage.url}
                      title={originalTitleText.text}
                      year={releaseYear.year}
                    />
                  );
                }
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default MoviesSection;
