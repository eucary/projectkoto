import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, updateDoc, doc, where } from 'firebase/firestore';
import './PostStatus.css';
import { deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase';

function PostStatus() {
  const [status, setStatus] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [fullName, setFullName] = useState('');
  const [userMap, setUserMap] = useState({}); // uid -> fullName

  // Fetch current user's full name
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

  // Fetch all statuses and all users' full names
  useEffect(() => {
    const fetchStatusesAndUsers = async () => {
      try {
        // Fetch statuses
        const q = query(collection(db, 'statuses'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const statusesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStatuses(statusesList);

        // Fetch all users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const map = {};
        usersSnapshot.forEach(doc => {
          const data = doc.data();
          map[data.uid] = data.fullName;
        });
        setUserMap(map);
      } catch (error) {
        console.error('Error fetching statuses or users:', error);
      }
    };
    fetchStatusesAndUsers();
  }, [status]);

  // Post a new status
  const handlePostStatus = async () => {
    if (!status.trim()) {
      alert('Status cannot be empty!');
      return;
    }
    if (!fullName) {
      alert('Loading your profile, please wait...');
      return;
    }
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'statuses'), {
        text: status,
        timestamp: serverTimestamp(),
        uid: user ? user.uid : null, // Only save UID
      });
      setStatus('');
    } catch (error) {
      console.error('Error posting status:', error);
      alert('Failed to post status. Please try again.');
    }
  };

  // ... keep your handleEdit, handleSaveEdit, handleDelete as is ...

  return (
    <div className="post-status">
      <textarea
        className="status-input"
        value={status}
        onChange={e => setStatus(e.target.value)}
        placeholder="Type your status here..."
      />
      <button onClick={handlePostStatus}>Post</button>
      <div className="status-list">
        <h2>Posted Status</h2>
        {statuses.length === 0 ? (
          <p>No statuses posted yet.</p>
        ) : (
          statuses.map((s) => (
            <div key={s.id} className="status-item">
              {editingId === s.id ? (
                <>
                  <textarea
                    className="status-input"
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <div className='poster'>
                    <span>
                      <strong>Posted by:</strong> {userMap[s.uid] || "Unknown"}
                    </span>
                    <div>{s.text}</div>
                    <small>
                      {s.timestamp && s.timestamp.toDate
                        ? new Date(s.timestamp.toDate()).toLocaleString()
                        : ''}
                    </small>
                  </div>
                  <br />
                  <div className="button-group">
                    {s.uid === (auth.currentUser && auth.currentUser.uid) && (
                      <>
                        <button onClick={() => handleEdit(s.id, s.text)}>Edit</button>
                        <button onClick={() => handleDelete(s.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PostStatus;