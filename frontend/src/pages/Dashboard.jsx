import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [tips, setTips] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: token }
      });
      setExpenses(response.data);
    };

    const fetchAIBudgetTips = async () => {
      const response = await axios.get('http://localhost:5000/api/ai/budget-tips');
      setTips(response.data);
    };

    fetchExpenses();
    fetchAIBudgetTips();
  }, []);

  return (
    <div>
      <h2>Your Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.category}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      
      <h2>AI-Generated Budget Tips</h2>
      <p>{tips}</p>
    </div>
  );
};

export default Dashboard;
