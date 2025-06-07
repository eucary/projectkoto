import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './StatusList.css';
function StatusList() {
  const [statuses, setStatuses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

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
  }, []);

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSave = async (id) => {
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'statuses', id));
      setStatuses(statuses.filter(status => status.id !== id));
    } catch (error) {
      alert('Failed to delete status.');
    }
  };

  return (
    <div className="status-list">
      <h2>Posted Status</h2>
{statuses.length === 0 ? (
  <p>No statuses posted yet.</p>
) : (
  statuses.map((status) => (
    <div key={status.id} className="status-item">
      {editingId === status.id ? (
        <>
          <textarea
            className="status-input"
            value={editingText}
            onChange={e => setEditingText(e.target.value)}
          />
          <button onClick={() => handleSave(status.id)}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{status.text}</p>
          <small>
            {status.timestamp && status.timestamp.toDate
              ? new Date(status.timestamp.toDate()).toLocaleString()
              : ''}
          </small>
          <br />
          <span>
            <strong>Author:</strong> {status.author || "Unkasdasd"}
          </span>
          <br />
          <button onClick={() => handleEdit(status.id, status.text)}>Edit</button>
          <button onClick={() => handleDelete(status.id)}>Delete</button>
        </>
      )}
    </div>
  ))
)}
    </div>
  );
}

export default StatusList;