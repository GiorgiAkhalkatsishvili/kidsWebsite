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
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
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
  const handleDragStart = (e, index) => {
    setDragIndex(index);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrag = (e) => {
    if (e.clientX !== 0 && e.clientY !== 0) {
      setDragPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (index) => {
    if (dragIndex === null) return;

    const newLetters = [...letters];
    const draggedItem = newLetters[dragIndex];

    newLetters.splice(dragIndex, 1);
    newLetters.splice(index, 0, draggedItem);

    setLetters(newLetters);
    setDragIndex(null);
    setIsDragging(false);
  };

  /* ---------- MOBILE TOUCH DRAG ---------- */
  const handleTouchStart = (e, index) => {
    e.preventDefault();
    setTouchIndex(index);
    setIsDragging(true);
    const touch = e.touches[0];
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (touchIndex === null) return;
    const touch = e.touches[0];
    setDragPosition({ x: touch.clientX, y: touch.clientY });
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
    setIsDragging(false);
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
          {letters.map((letter, index) => {
            const isBeingDragged = dragIndex === index || touchIndex === index;
            
            return (
              <div
                key={index}
                ref={(el) => (letterRefs.current[index] = el)}
                className={`letter ${isBeingDragged ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onTouchStart={(e) => handleTouchStart(e, index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {letter}
              </div>
            );
          })}
        </div>

        {/* Floating dragged letter */}
        {isDragging && (dragIndex !== null || touchIndex !== null) && (
          <div
            className="floating-letter"
            style={{
              left: `${dragPosition.x}px`,
              top: `${dragPosition.y}px`,
            }}
          >
            {letters[dragIndex !== null ? dragIndex : touchIndex]}
          </div>
        )}

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
