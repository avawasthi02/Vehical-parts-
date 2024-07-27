import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionSummary from '../components/TransactionSummary';


function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionSummary />
      {transactions.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              {transaction.vehicle} - {transaction.issue} - ${transaction.final_price} on {transaction.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transactions;
