import './Navbar1.css';
import logo from '../assets/logoko.png'; // Import the image
import { auth } from '../firebase'; // Import Firebase auth
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signOut } from 'firebase/auth'; // Import signOut explicitly

function Navbar1() {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      alert('Logged out successfully!');
      navigate('/'); // Redirect to the login page
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <nav className="navbar">
      <div className='logoname'>
        <img src={logo} alt="Logo" className="navbar__logo" /> {/* Use the imported logo */}
        <div className="navbar__title">Status Hub</div>
      </div>
      <ul className="navbar__links">
        <li className="navbar__link"onClick={() => navigate('/landingpage')}>Home</li>
        <li className="navbar__link"onClick={() => navigate('/about')}>About</li>
        <li className="navbar__link" onClick={handleLogout}>Log out</li>
      </ul>
    </nav>
  );
}

export default Navbar1;