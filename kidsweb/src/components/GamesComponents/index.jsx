import React from 'react'
import './GamesComponents.css';
import numbersImg from '../../assets/numbers.png';
import colorsImg from '../../assets/colors.png';
import mathImg from '../../assets/math.png';
import abcImg from '../../assets/abc.png';
import { Link } from 'react-router-dom';


const GamesComponents = () => {
  return (
    <div className='gamesComponents'>
      <div className="inner">
        <div className="main-games">
          <Link to='/letters'>
            <div className="gameOne">
            <img src={abcImg} alt="" />
            </div>
          </Link>
          <div className="gameOne">
            <img src={colorsImg} alt="" />
          </div>
          <div className="gameOne">
            <img src={numbersImg} alt="" />
          </div>
          <div className="gameOne">
            <img src={mathImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesComponents
