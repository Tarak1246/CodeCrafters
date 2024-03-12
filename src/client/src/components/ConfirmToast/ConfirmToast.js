// ConfirmToast.js

import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmToast = ({ onConfirm, onClose }) => {
  
  const handleConfirm = () => {
    onConfirm();
    // onClose();
  };

  return (
    <div>
      <p>Are you sure you want to delete?</p>
      <button onClick={handleConfirm}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
};

export default ConfirmToast;
