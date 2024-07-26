// src/components/BusinessReviews.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import '../styles/BusinessReviews.css';

const BusinessReviews = () => {
  const { userId } = useParams();  
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(`Fetching reviews for owner ID: ${userId}`); 

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/owner/${userId}`);
        console.log('Fetched reviews:', response.data);  
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [userId]);

  const handleReplySubmitted = async () => {
    // Refetch reviews after a reply is submitted
    try {
      const response = await axios.get(`http://localhost:3000/reviews/owner/${userId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error refetching reviews:', error);
    }
  };

  return (
    <div className="reviews-container">
      <h2>Customer Reviews</h2>
      <ReviewList reviews={reviews} onReplySubmitted={handleReplySubmitted} role="businessowner" />
    </div>
  );
};

export default BusinessReviews;
