import React from 'react';
import {AiFillHome, AiFillProject} from 'react-icons/ai'
import {IoIosContact} from 'react-icons/io'
import {MdEmail} from 'react-icons/md'


function NavTabs({ currentCalculator, handleCalculatorChange }) {
  return (
    <ul className="nav nav-tabs">
        <li><h1>Alastair Lee</h1></li>
        <li className="nav-item">
        <a
          href="#confidence"
          onClick={() => handleCalculatorChange('Confidence')}
          className={currentCalculator === 'Confidence' ? 'nav-link active' : 'nav-link'}
        >
          <AiFillHome className = 'home'/>
        </a>
        </li>
      
        <li className="nav-item">
            <a
            href="#rolls"
            onClick={() => handleCalculatorChange('Rolls')}

            className={currentCalculator === 'Rolls' ? 'nav-link active' : 'nav-link'}
            >
            <AiFillProject className = 'proj'/>
            </a>
        </li>

    </ul>
  );
}

export default NavTabs;
