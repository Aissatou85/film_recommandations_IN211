import React, { useState, useEffect } from 'react';
import './UsersPopup.css';

import Popup from '../Popup/Popup';

import AddUserForm from '../AddUserForm/AddUserForm';
import UsersTable from '../UsersTable/UsersTable';

const UsersPopup = ({onClose }) => {

  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleAddUserClick = () => {
    setShowAddUserForm(true);
  };

  const handleAddUserFormClose = () => {
    setShowAddUserForm(false);
  };

  return (
    <Popup isOpen={true} onClose={onClose} title={showAddUserForm ? "Add User" : "Users"}>
      {showAddUserForm ? (
        <AddUserForm onClose={handleAddUserFormClose} />
      ) : (
        <UsersTable handleAddUserClick={handleAddUserClick}/>
      )}
    </Popup>
  );
};

export default UsersPopup;