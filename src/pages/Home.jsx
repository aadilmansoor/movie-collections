import MoviesSection from "../components/MoviesSection";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center flex-col items-center flex-1">
        <MoviesSection />
      </div>
    </>
  );
};
export default Home;
