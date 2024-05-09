import { number, string } from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ id, imageUrl, title, year }) => {
  if (imageUrl === null || title === null) {
    return;
  }
  return (
    <Link to={`/title/${id}`} className="cursor-pointer">
      <div className="text-center flex flex-col items-center mt-3">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-[275px] w-[200px] md:h-[450px] md:w-[275px]"
        />
        <div className="w-[200px] sm:w-full">
          <h2 className="text-xl body-bold">{title}</h2>
          <p className="base-medium">{year}</p>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  id: string,
  imageUrl: string,
  title: string,
  year: number,
};

export default MovieCard;
