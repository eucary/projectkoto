import './Landingpage.css';
import Sidebar from './components/Sidebar';
import Navbar1 from './components/Navbar1'; // Import your Navbar component
import { auth } from './firebase'; // Import Firebase auth
import Userbar from './components/Userbar'; // Import your Userbar component
import PostStatus from './components/PostStatus';
import StatusList from './components/StatusList';
function Landingpage() {
  const userEmail = auth.currentUser?.email || "Guest"; // Get the logged-in user's email or default to "Guest"

  return (
    <>
      <Navbar1 />
      
      <div className="container1">
        <Sidebar email={userEmail} /> {/* Pass the logged-in email as a prop */}
        <div className="content1">
          <div className="landingpage">
            <headd>Welcome to StatusHub</headd>
            <p>Feel free to post your thoughts here.</p>
            <PostStatus />
          </div>
        </div>
      </div>
    </>
  );
}

export default Landingpage;