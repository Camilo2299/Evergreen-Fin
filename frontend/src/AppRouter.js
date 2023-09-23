import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Payment from './components/Payment';
import Purchase from './components/Purchase';
import FinancialStatement from './components/FinancialStatement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRouter = () => {
  return (
    <Router>
      <ToastContainer /> {/* Coloca el ToastContainer aquí */}
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/financial/statement" element={<FinancialStatement />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;