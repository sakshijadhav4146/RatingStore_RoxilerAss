const express = require('express')
const router = express.Router();
const db = require('../models/db');
const { authmiddleware } = require('../middleware/auth');


router.post('/addStore',authmiddleware,(req,res)=>{
    if(req.user.role != 'admin') return res.status(403).json("Not Authorized");

    const {StoreName,email,StoreAddress} = req.body;

    const addStore = `INSERT INTO stores(StoreName, email, StoreAddress) VALUES(?,?,?)`
    db.query(addStore,[StoreName,email,StoreAddress],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.status(201).json({ message: "Store created successfully", storeId: result.storeId});
    })
})


router.get('/',(req,res)=>{
    db.query(`SELECT * FROM stores`,(err,result)=>{
        if (err) return res.status(500).json(err);
        res.status(200).json(result);
    })
})


module.exports=router
