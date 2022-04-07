import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import Button from '../Button';
import Logo from '../Logo';
import './index.css';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="container navbar__nav">
        <Logo />

        <div className="navbar__menu">
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </div>
      </div>
    </nav>
  )
}
