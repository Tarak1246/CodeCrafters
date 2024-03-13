/**
 * @file ConfirmToast.js
 * @description Renders a confirmation toast component for user confirmation actions.
 * @author @Tarak1246
 */

/**
 * @module react
 * @description Core library for building user interfaces with React.
 */
import React from 'react';
/**
 * @function ConfirmToast
 * @description A confirmation toast component to be used for user confirmation.
 * @param {function} onConfirm - Callback function to be executed on confirmation.
 * @param {function} onClose - Callback function to be executed on closing the toast.
 * @returns {JSX.Element} The JSX representation of the confirmation toast.
 */
const ConfirmToast = ({ onConfirm, onClose }) => {
  
  const handleConfirm = () => {
    onConfirm();
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
