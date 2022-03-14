import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {FaBars} from 'react-icons/fa';

const NavBar = () => {

    const [isToggled, setIsToggled] = useState('False');

    const toggleMenu = () => {
        setIsToggled(!isToggled);
    }; 

    return (
        <div className='container'>
        <nav className='navbar'>
            <Link className='logo' to='/'>
                College Search
            </Link>
            <div onClick={toggleMenu} className='menu-toggle' id='mobile-menu'>
                <FaBars className='bars'/>
            </div>
            <ul className={isToggled ? 'menu' : 'menu active'}>
                <li>
                <Link className='link' to='/'>Colleges</Link>
                </li>
                <li>
                <Link className='link' to='/programs'>Programs</Link>
                </li>
            </ul>
        </nav>
        </div>
    )
}

export default NavBar;
