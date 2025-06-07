import React, { useEffect, useState } from "react";
import Navbar1 from "./components/Navbar1";
import Sidebar from "./components/Sidebar";
import { auth, db } from "./firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
        // Fetch full name from Firestore
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          setFullName(data.fullName || "");
          setUserDocId(docSnap.id);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    if (userDocId) {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, {
        fullName,
        email,
      });
      setEditing(false);
    }
  };

  return (
    <>
      <Navbar1 />
      <div className="container2">
        <Sidebar />
        <div className="content3">
            <div className="profile-container">
              <div className="emailfullname">
                <eemail>
                    <p3>Email</p3>
                    <input
                      type="email"
                      value={email}
                      readOnly  
                      placeholder="Email"
                    />
                </eemail>
                <fullname>
                  <p3>Full Name</p3>
                  <input
                    type="fullname"
                    value={fullName}
                    readOnly={!editing}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Full Name"
                  />
                </fullname>
              </div>
                <buttonsaveback>
                {!editing ? (
                  <button className="edit-profile-button" onClick={handleEdit}>Edit Profile</button>
                ) : (
                  <button className="save" onClick={handleSave}>Save</button>
                )}
                <Link to="/Landingpage" className="back-link">
                  <button className="back-button">Back</button></Link>
                </buttonsaveback>
            </div>
          </div>
      </div>
    </>
  );
}

export default Profile;