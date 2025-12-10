import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './LettersPage.css';
import voice from '../../assets/voice.mp3';

const LettersPage = () => {
  const correctWord = "გიო";
  const scrambled = ["ო", "გ", "ი"];

  const [letters, setLetters] = useState(scrambled);
  const [dragIndex, setDragIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const audio = new Audio(voice);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (index) => {
    const newLetters = [...letters];
    const draggedItem = newLetters[dragIndex];

    newLetters.splice(dragIndex, 1);
    newLetters.splice(index, 0, draggedItem);

    setLetters(newLetters);
    setDragIndex(null);
  };

  const checkWord = () => {
    if (letters.join("") === correctWord) {
      audio.play();
      setMessage("✔ ყოჩაღ, სიტყვა სწორადაა აწყობილი");
      setShowPopup(true);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setMessage("❌ ისევ სცადე...");
      setShowPopup(true);
      setShowConfetti(false);
    }
  };

  const closeMessage = () => {
    setShowPopup(false);
    setMessage("");
  };

  return (
    <div className='lettersPage'>
      {showConfetti && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            gravity={0.5}
            initialVelocityY={20}
            recycle={false}
            confettiSource={{
              x: 0,
              y: windowSize.height,
              w: windowSize.width,
              h: 0
            }}
          />
        </div>
      )}

      <div className="inner">
        <h2>ააწყვე სიტყვა</h2>

        <div className="lettersBox">
          {letters.map((letter, index) => (
            <div
              key={index}
              className="letter"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="button-container">
          <button className="checkBtn" onClick={checkWord}>
            შემოწმება
          </button>
        </div>

        {showPopup && (
          <div className="result-message-overlay">
            <div className="result-message">
              <p className="message">{message}</p>
              <button onClick={closeMessage}>გაგრძელება</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LettersPage;
