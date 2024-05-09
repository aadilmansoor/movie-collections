import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Link to={"/"} replace={true}>
      <div className="h-[100px] ps-3 py-5 bg-neutral-800 flex items-center cursor-pointer">
        <h2 className="h3-bold sm:h2-bold">Cinematech</h2>
      </div>
    </Link>
  );
};
export default Navbar;
