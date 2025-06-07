import { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './App.css';
import Navbar from './components/navbar';
import { auth } from './firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle user login
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign in successful!');
      navigate('/Landingpage'); // Navigate to the landing page after successful login
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Navigate to Register page
  const goToRegister = () => {
    navigate('/register'); // Navigate to the /register route
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <h1>Welcome to my StatusHub</h1>
          <p>Feel free to explore, but login first!</p>
          <div className="login">
            <h2>Login</h2>
            <form>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
              </div>

                <button type="submit" onClick={handleSignIn}>
                  Sign in
                </button>


                <button type="button" onClick={goToRegister}>
                  Sign up
                </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App; 




/*
import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import { auth } from './firebase'; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Register from './Register';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user login
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Sign in successful!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Handle user registration
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="content">
          <h1>Welcome to my StatusHub</h1>
          <p>Feel free to explore, but login first!</p>
          <div className="login">
            <h2>Login</h2>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="done-button">
                <button type="submit" onClick={handleSignIn}>
                  Sign in
                </button>
              </div>
              <div className="done-button">
                <button type="submit" onClick={handleSignUp}>
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App; 

*/