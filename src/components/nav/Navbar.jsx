import "./navbar.css";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="container">
        <h1>Prem maurya</h1>
        <div className="links">
          <a className="link" href="#home">Home</a>
          <a className="link" href="#about">About</a>
          <a className="link" href="#projects">Projects</a>
          <a className="link" href="#connect">Connect</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
