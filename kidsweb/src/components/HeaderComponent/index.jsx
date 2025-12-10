import React, { useRef, useState, useEffect } from 'react'
import './HeaderComponent.css';
import lightBulbImage from '../../assets/think.png';
import burgerMenu from '../../assets/burgerMenu.svg'
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebar && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const menuBtn = document.querySelector('.menu-btn');
        if (menuBtn && !menuBtn.contains(event.target)) {
          setSidebar(false);
        }
      }
    };

    if (sidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebar]);

  return (
    <div className='headerComponent'>
      <div 
        className="sidebar-overlay"
        style={{
          opacity: sidebar ? '1' : '0',
          pointerEvents: sidebar ? 'auto' : 'none',
        }}
        onClick={() => setSidebar(false)}
      ></div>

      <div className="inner">

        <Link to='/'><div className="main-image">
          <h3>Brain Games</h3>
          <img src={lightBulbImage} alt="" />
        </div></Link>

        <div className="nav-links">
          <ul>
            <Link to="/"><li>მთავარი</li></Link>
            <li>თამაშები</li>
            <li>შესახებ</li>
            <li>დახმარება</li>
          </ul>
        </div>

        <div className="nav-btn">
          <button>დაგვიკავშირდი</button>
        </div>
        <div className="menu-btn" onClick={() => setSidebar(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" width='50px' height='50px' fill='#fff'/></svg>
        </div>

        <div
          ref={sidebarRef}
          className="responsive-menu"
          style={{
            transform: sidebar ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="closing-svg" onClick={() => setSidebar(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" fill='#000'/>
            </svg>
          </div>

          <div className="sidebar-search">
            <input type="text" placeholder='ძიება'/>
            <div className="search-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
            </div>
          </div>

          <div className="sidebar-links">
            <ul>
            <Link to="/"><li>მთავარი</li></Link>
            <li>თამაშები</li>
            <li>შესახებ</li>
            <li>დახმარება</li>
          </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HeaderComponent;
