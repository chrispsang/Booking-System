// src/components/BusinessList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/BusinessList.css';

const BusinessList = () => {
  const { user } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/businesses/owner/${user.id}`);
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    if (user) {
      fetchBusinesses();
    }
  }, [user]);

  return (
    <div className="business-list-container">
      <h2>Your Businesses</h2>
      <ul className="business-list">
        {businesses.map((business) => (
          <li key={business.id}>
            <Link to={`/businessowner/business-details/${business.id}`}>{business.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
