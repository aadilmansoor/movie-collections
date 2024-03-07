import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <div className="w-full mt-8 lg:mt-14">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/title/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
export default App;
