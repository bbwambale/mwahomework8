const dbConnect = require('../connection/dbConnect');
const express = require('express');
const router = express.Router();

//router.route('/')
router.all('/*',(req, res, next)=>{
    req.connection = dbConnect.connection;
    req.db = dbConnect.db;
    next();
})
router.get('/',(req, res, next)=>{
    let query = {};
    let option = {"_id": 0};

    req.db.collection('Restaurants')
    .find(query).project(option).toArray((err, doc)=>{
        if(err) throw err;
        res.send(JSON.stringify(doc));
    });

})
router.get('/search',(req, res)=>{
    let category = req.query.category;
    let name = req.query.name;
    let long = parseFloat(req.query.long);
    let lat = parseFloat(req.query.lat);
   

    if(category !== null && !"".match(category)){
        let option = {"_id":0}
        let query = (name !== null && !"".match(name)) ? 
        {"location":{$near:[long,lat]}, "category":category, "name":name} 
        : {"location":{$near:[long,lat]}, "category":category};

       req.db.collection('Restaurants')
        .find(query).project(option).limit(3).toArray((err, doc)=>{
            if (err) throw err;
            res.send(JSON.stringify(doc));
        })

    }else{
        res.send(JSON.stringify({message : "The category is required"}));
    }
})
router.post('/',(req, res)=>{
    let query = req.body;
    req.db.collection('exercise2')
    .insert(query, (err, doc)=>{
        if (err) throw err;
        console.log(`success`);
        res.send(JSON.stringify({message : "success"}));
    });    
    console.dir("Inserting...");
});
module.exports = router;