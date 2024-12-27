import React from 'react';
import { Link } from 'react-router-dom';
import './DropdownMenu.css';

function DropdownMenu({ items, routeType }) {
  return (
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            to={`/skins/${encodeURIComponent(routeType)}/${encodeURIComponent(item)}`}
            className="dropdown-link"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default DropdownMenu;
