import React from 'react';
import './DropdownMenu.css';

function DropdownMenu({ items }) {
  return (
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
