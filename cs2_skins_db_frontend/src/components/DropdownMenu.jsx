import React from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

function DropdownMenu({ category, items }) {
  return (
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li key={index}>
          <Link to={`/skins/${encodeURIComponent(category)}/${encodeURIComponent(item)}`} class="dropdown-link"> {/* encoding whitespaces */}
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
