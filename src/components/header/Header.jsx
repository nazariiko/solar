import React from 'react';
import logo from '../../assets/logo.jpg';

const Header = () => {
  return (
    <div className='header'>
      <img className='logo' src={logo} />
    </div>
  );
};

export default Header;