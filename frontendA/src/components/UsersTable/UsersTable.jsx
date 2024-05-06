import { useEffect, useState } from 'react';
import axios from 'axios';
import './UsersTable.css';

const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersLoadingError, setUsersLoadingError] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setUsersLoadingError('An error occured while fetching users.');
        console.error(error);
      });
  }, []);

  return { users, usersLoadingError };
};

function UsersTable({ handleAddUserClick }) {
  const { users, usersLoadingError } = useFetchUsers();
  const [editMode, setEditMode] = useState(false);

  const deleteUser = (userId) => {
    axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/users/${userId}`);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const filledUsers = [...users, ...Array(Math.max(6 - users.length, 0)).fill(null)];

  return (
    <div className='container'>
    <div className="user-list">
      {filledUsers.map((user, index) => (
        <div key={index} className="user-item">
          {user ? (
            <>
              <div className="user-avatar"></div>
              <span className="user-name">{user.firstname}</span>
              {editMode && (
                <button className="delete-button" onClick={() => deleteUser(user.id)}>Delete</button>
              )}
            </>
          ) : (
            editMode ? null : (
              <div className="add-user" onClick={handleAddUserClick}>
                <span>+</span>
              </div>
            )
          )}
        </div>
      ))}
      </div>
      <div>
        {usersLoadingError !== null && (
          <div className="error-message">{usersLoadingError}</div>
        )}
      </div>
      {editMode ? (
        <button className="cancel-edit-button" onClick={toggleEditMode}>Cancel</button>
      ) : 
      <button className="cancel-edit-button" onClick={toggleEditMode}>Manage users</button>
      }
    </div>
  );
}

export default UsersTable;

{/* <button onClick={() => deleteUser(user.id)}>Delete</button> */}
