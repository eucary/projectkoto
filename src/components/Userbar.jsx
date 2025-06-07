import './Userbar.css';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Userbar() {
  const [users, setUsers] = useState([]); // State to store the list of users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) => {
          console.log('Document data:', doc.data()); // Debugging log
          return doc.data();
        });
        setUsers(usersList);
        console.log('Users list:', usersList); // Debugging log
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []);

  return (
    <div className="userbar">
      <div className="userbar__content">
        <h2 className="text">All Registered Users</h2>
        {users.length > 0 ? (
          users.map((user, index) => (
            <p key={index}>{user.email}</p> // Display each user's email
          ))
        ) : (
          <p>No users found.</p> // Display a message if no users are found
        )}
      </div>
    </div>
  );
}

export default Userbar;