
import Navbar1 from './components/Navbar1'; // Import the Navbar component
import './About.css'; // Import the CSS file for styling
function About() {
  return (
    <>
    <Navbar1/>
    <div className="about-container">
        <div className="about-author">
            
            <img src="src/assets/FRAME.JPG" alt="Author Avatar" className="author-avatar" />
        </div>
        <div className="about-details">
            <div className="about-author-info">
                <h1>Hi, I'm Eucary Lloyd Dupagan</h1>
                <p>
                    This is my personal project, StatusHub, which I created to learn and practice ReactJS. Hope you'll like it!
                </p>
               

                </div>
                
            <div className="about-website"> 
                <h1>About Status Hub</h1>
                <p>
                        Status Hub is an open-source project aimed at creating a comprehensive
                        platform for managing and sharing knowledge. Our goal is to provide a
                        user-friendly interface that allows users to easily create, edit, and
                        share content.
                </p>
                <p className=''>
                    We believe in the power of community-driven development and welcome
                    contributions from anyone interested in improving the platform.
                </p>
            </div>
        </div>
    </div>
  </>);
}

export default About;