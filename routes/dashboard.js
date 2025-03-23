// adminRoute.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { authmiddleware } = require('../middleware/auth');

router.get('/', authmiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }

  const userQuery = 'SELECT COUNT(*) AS total_users FROM users';
  const storeQuery = 'SELECT COUNT(*) AS total_stores FROM stores';
  const ratingQuery = 'SELECT COUNT(*) AS total_ratings FROM ratings';


  db.query(userQuery, (err, userResult) => {
    if (err) return res.status(500).json({ msg: 'Error fetching user data' });

    db.query(storeQuery, (err, storeResult) => {
      if (err) return res.status(500).json({ msg: 'Error fetching store data' });

      db.query(ratingQuery, (err, ratingResult) => {
        if (err) return res.status(500).json({ msg: 'Error fetching rating data' });

        
        res.status(200).json({
          total_users: userResult[0].total_users,
          total_stores: storeResult[0].total_stores,
          total_ratings: ratingResult[0].total_ratings,
        });
      });
    });
  });
});

module.exports = router;
