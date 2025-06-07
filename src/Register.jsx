import { useState } from 'react';
import { auth } from './firebase';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import './Register.css'; // Import your CSS file
import Navbar1 from './components/Navbar1'; // Import your Navbar component

function Register() {
  const [fullName, setFullName] = useState(''); // State for full name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return; // Stop form submission
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Add full name and email to Firestore
await addDoc(collection(db, 'users'), {
  fullName,
  email,
  uid: userCredential.user.uid,
});
      alert('Account registered successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="container">
        <div className="content">
          <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
               <div className="form-group">
                <label htmlFor="full-name"></label>
                <input
                  type="fullname"
                  id="full-name"
                  value={fullName}
                  placeholder="Enter your full name"
                  onChange={(e) => setFullName(e.target.value)} // Update full name state
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"></label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password"></label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  placeholder="Confirm your password"
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                  required
                />
              </div>
              <div className="buttons">
                <button type="submit">Register</button> {/* No onClick handler here */}
                <button type="button" onClick={() => window.location.href = '/'}>Back</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;