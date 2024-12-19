import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import './NavBar.css';

function NavBar() {
  const [cases] = useState(['Gallery Case', 'Kilowatt Case']); // TODO: Replace with dynamic data 

  return (
    <nav className="navbar">
      <h1>CS2 Skins</h1>
      <ul className="nav-links">
        <li>
          Cases
          <DropdownMenu items={cases} />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
