import './Sidebar.css';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Import Link
import imageIcon from '../assets/image.png'; // Import the image
import homepicIcon from '../assets/homepic.png'; // Import the image
function Sidebar() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setFullName(querySnapshot.docs[0].data().fullName);
        }
      }
    };
    fetchFullName();
  }, []);

  return (
    <div className="sidebar">
      <p className='fullname'>{fullName}</p>
      <ul className="sidebar__links">

        <li className='sidebar__link'>
          <img src={imageIcon} className='sidebar__icon' alt="Profile Icon" />
          <Link to="/Profile">Profile</Link>
        </li>
        <li className='sidebar__link'>
          <img src={homepicIcon} className='sidebar__icon' alt="Home Icon" />
          <Link to="/Landingpage">Back</Link>
          </li>
      </ul>
    </div>
  );
}

export default Sidebar;