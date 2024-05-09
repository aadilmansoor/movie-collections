import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import SearchResults from "./SearchResults";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "./ui/use-toast";

const MoviesSection = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [movieCollection, setMovieCollection] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const debouncedValue = useDebounce(searchText, 500);

  const { toast } = useToast();

  const options = {
    method: "GET",
    url: "https://moviesdatabase.p.rapidapi.com/titles",
    params: {
      list: "top_rated_english_250",
      sort: "pos.incr",
      limit: 9,
      page: currentPage,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_X_RAPID_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_X_RAPID_API_HOST,
    },
  };

  useEffect(() => {
    if (debouncedValue.length > 0) {
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.request(options);
        setMovieCollection(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousClick = () => {
    if (currentPage === 1) {
      return toast({
        title: "There are no previous pages to navigate to",
      });
    }
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
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
        {debouncedValue.length > 0 ? (
          <SearchResults searchText={searchText} />
        ) : (
          <>
            <h2 className="h3-bold md:h2-bold text-center">Popular Movies</h2>
            {isLoading ? (
              <Loader />
            ) : (
              <>
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
                <Pagination className="my-12">
                  <PaginationContent>
                    <PaginationItem
                      onClick={handlePreviousClick}
                      className="cursor-pointer"
                    >
                      <PaginationPrevious />
                    </PaginationItem>
                    <PaginationItem
                      onClick={handleNextClick}
                      className="cursor-pointer"
                    >
                      <PaginationNext />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default MoviesSection;
