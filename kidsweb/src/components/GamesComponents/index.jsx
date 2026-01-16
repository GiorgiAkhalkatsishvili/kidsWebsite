import React from 'react';
import './GamesComponents.css';

const CardsComponent = () => {
  return (
    <div className="GamesComponents">
      <div className="welcome-title">მოგესალმებით, პატარებო!</div>

      <div className="card-grid">
        <div className="card card-1">
          <div className="icon-placeholder">ABC</div>
          <div className="card-title">სასწავლო ბლოკები</div>
        </div>

        <div className="card card-2">
          <div className="icon-placeholder">🧩</div>
          <div className="card-title">თანამშრომლობა</div>
        </div>

        <div className="card card-3">
          <div className="icon-placeholder">🎨</div>
          <div className="card-title">შემოქმედება</div>
        </div>

        <div className="card card-4">
          <div className="icon-placeholder">🎮</div>
          <div className="card-title">გართობა</div>
        </div>

        <div className="card card-5">
          <div className="icon-placeholder">📖</div>
          <div className="card-title">საკითხავი</div>
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;
