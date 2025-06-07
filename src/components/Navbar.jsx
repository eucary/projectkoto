import './navbar.css';
import logo from '../assets/logoko.png'; // Import the image

function Navbar() {

  return (
    <nav className="navbar">
      <div className="navbar__brand">
      <img src={logo} alt="Logo" className="navbar__logo" /> {/* Use the imported logo */}
      <h1 className="navbar__title">StatusHub</h1> {/* Add the H1 beside the logo */}
      </div>
      <ul className="navbar__links">
      </ul>
    </nav>
  );
}

export default Navbar;