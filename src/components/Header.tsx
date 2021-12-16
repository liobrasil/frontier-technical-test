import React from 'react';
import s from './Header.module.css';
import logo from '../assets/frontier.png';

function Header(): JSX.Element {
  return (
    <div className={s.header}>
      <img src={logo} alt="Frontier logo" />
    </div>
  );
}

export default Header;
