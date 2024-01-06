import React from 'react';
import { useState } from 'react';


const MatchPopup = ({ message, onConfirm, onCancel }) => {
  return (
   <>
     <div className="popup">
    <div className="popup-content">
      <p>{message}</p>
      <div className="popup-buttons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  </div>
   </>
  )
}

export default MatchPopup