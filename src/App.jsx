import Navbar from "./components/nav/Navbar";
import About from "./components/sections/About";
import Home from "./components/sections/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
    </>
  );
};

export default App;
