import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import './LettersPage.css';
import voice from '../../assets/voice.mp3';

const LettersPage = () => {
  const correctWord = "გიო";
  const scrambled = ["ო", "გ", "ი"];

  const [letters, setLetters] = useState(scrambled);
  const [dragIndex, setDragIndex] = useState(null);
  const [touchIndex, setTouchIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const containerRef = useRef(null);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });

  const audio = new Audio(voice);
  const letterRefs = useRef([]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setConfettiSize({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  /* ---------- DESKTOP DRAG ---------- */
  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (index) => {
    if (dragIndex === null) return;

    const newLetters = [...letters];
    const draggedItem = newLetters[dragIndex];

    newLetters.splice(dragIndex, 1);
    newLetters.splice(index, 0, draggedItem);

    setLetters(newLetters);
    setDragIndex(null);
  };

  /* ---------- MOBILE TOUCH DRAG ---------- */
  const handleTouchStart = (index) => {
    setTouchIndex(index);
  };

  const handleTouchEnd = (e) => {
    if (touchIndex === null) return;

    const touch = e.changedTouches[0];
    const targetIndex = letterRefs.current.findIndex((el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      );
    });

    if (targetIndex !== -1 && targetIndex !== touchIndex) {
      const newLetters = [...letters];
      [newLetters[touchIndex], newLetters[targetIndex]] =
        [newLetters[targetIndex], newLetters[touchIndex]];
      setLetters(newLetters);
    }

    setTouchIndex(null);
  };

  /* ---------- CHECK WORD ---------- */
  const checkWord = () => {
    if (letters.join("") === correctWord) {
      audio.play();
      setMessage("✔ ყოჩაღ, სიტყვა სწორადაა აწყობილი");
      setShowPopup(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 6000);
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
    <div className="lettersPage" ref={containerRef}>
      {showConfetti && (
        <Confetti
          width={confettiSize.width}
          height={confettiSize.height}
          numberOfPieces={200}
          recycle={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      )}

      <div className="inner">
        <h2>ააწყვე სიტყვა</h2>

        <div className="lettersBox">
          {letters.map((letter, index) => (
            <div
              key={index}
              ref={(el) => (letterRefs.current[index] = el)}
              className={`letter ${touchIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
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
