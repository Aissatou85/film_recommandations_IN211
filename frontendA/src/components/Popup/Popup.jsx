import React, {useEffect} from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const popup = document.querySelector('.popup-container');
      if (popup && !popup.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{title}</h2>
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;