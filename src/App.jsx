import Navbar from "./components/nav/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Projects from "./components/pages/Projects";
import Connect from "./components/pages/Connect";

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
      <div id="projects">
        <Projects />      
      </div>
      <div id="connect">
        <Connect />      
      </div>
    </>
  );
};

export default App;
