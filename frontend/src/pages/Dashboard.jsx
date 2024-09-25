import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [tips, setTips] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    const fetchAIBudgetTips = async () => {
      try {
        const response = await api.get('/ai/budget-tips');
        setTips(response.data);
      } catch (error) {
        console.error('Error fetching budget tips:', error);
      }
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
