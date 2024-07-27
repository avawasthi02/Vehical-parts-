import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Components from './pages/Components';
import Vehicles from './pages/Vehicles';
import Issues from './pages/Issues';
import Transactions from './pages/Transactions';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/components" element={<Components />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
};

export default App;
