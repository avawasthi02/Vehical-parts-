import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/components">Components</Link></li>
        <li><Link to="/vehicles">Vehicles</Link></li>
        <li><Link to="/issues">Issues</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
