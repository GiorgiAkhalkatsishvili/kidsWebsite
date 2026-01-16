import React from 'react';
import './HeaderComponent.css';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header className="headerComponent">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1 className="logo">🌈 საბავშვო</h1>
        </Link>

        <nav className="nav-links">
          <button className="nav-btn active">მთავარი</button>
          <button className="nav-btn">ბაზა</button>
          <button className="nav-btn">ჩვენს შესახებ</button>
          <button className="nav-btn profile">შესვლა 👤</button>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
