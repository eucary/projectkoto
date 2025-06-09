import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import './PostStatus.css';
import { deleteDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { where } from 'firebase/firestore';
function PostStatus() {
  const [status, setStatus] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [fullName, setFullName] = useState('');
  // Fetch all statuses

  
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
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const q = query(collection(db, 'statuses'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const statusesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStatuses(statusesList);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };
    fetchStatuses();
  }, [status]); // refetch when a new status is posted
    const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, 'statuses', id));
    setStatuses(statuses.filter(status => status.id !== id));
  } catch (error) {
    alert('Failed to delete status.');
  }
};
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
      author: fullName,
      uid: user ? user.uid : null, // <-- Save UID for ownership
    });
    setStatus('');
  } catch (error) {
    console.error('Error posting status:', error);
    alert('Failed to post status. Please try again.');
  }
};

  // Start editing a status
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited status
  const handleSaveEdit = async (id) => {
    try {
      const statusRef = doc(db, 'statuses', id);
      await updateDoc(statusRef, { text: editingText });
      setEditingId(null);
      setEditingText('');
      // Refresh statuses
      const q = query(collection(db, 'statuses'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const statusesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatuses(statusesList);
    } catch (error) {
      alert('Failed to update status.');
    }
  };

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
        <head2>Posted Status</head2>
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
                      <strong>Posted by:</strong> {fullName}
                    </span>
                    <posted>{s.text}</posted>
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