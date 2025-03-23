const express = require('express')
const router = express.Router();
const db = require('../models/db');
const { authmiddleware } = require('../middleware/auth');

router.post('/:store_id',authmiddleware,(req,res)=>{
    if(req.user.role != 'normal'){
        return res.status(403).json("Unauthorized");
    }
    
    const store_id = req.params.store_id;
    const user_id = req.user.id;
    const rating = req.body.rating;

    if(!rating || rating<1 || rating>5){
        return res.status(400).json({msg:"Rating must be between 1 to 5"});
    }

    const addRating = `INSERT INTO ratings(user_id,store_id,rating) VALUES(?,?,?) ON DUPLICATE KEY UPDATE rating=?`
    db.query(addRating,[user_id,store_id,rating,rating],(err,result)=>{
        if(err){
            console.log(err);
            
            return res.status(500).json({msg:"Error submitting rating"});
        }
        res.json({msg:"Rating submitted successfully"})
    })
})

router.get('/:store_id',(req,res)=>{
    const store_id = req.params.store_id;
    const allRatings = `SELECT AVG(rating) AS average_rating FROM ratings WHERE store_id=?`

    db.query(allRatings,[store_id],(err,result)=>{
        if(err){
            return res.status(500).json({msg:"Error fetching store rating"})
        }
        const avgRating = result[0].average_rating
        res.json({ store_id: store_id, average_rating: avgRating})
    })
})
module.exports=router;