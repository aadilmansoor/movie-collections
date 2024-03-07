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
          width={200}
          height={275}
          className="object-cover"
        />
        <div className="w-[200px] sm:w-full">
          <h2 className="text-lg sm:body-bold">{title}</h2>
          <p className="base-medium">{year}</p>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;
