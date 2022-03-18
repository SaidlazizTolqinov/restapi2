const express = require("express")
const router = express.Router()
const movies = require("../model/movie")

router.get("/api/movies" , (req, res)=>{
    movies.find({} , (err , data)=>{
        if(err) throw err
        if(data=="") {
            res.send("Ma'lumot yo'q")
        } else {
            res.json(data)
        }
    })
})


// 2

router.post("/api/movies" , (req, res)=>{
    const db = new movies(req.body);
    const promise = db.save()
    promise.then(data=>{
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

// 3

router.get("/api/movies/:movie_id" , (req, res)=>{
    movies.findById(req.params.movie_id , (err , data)=>{
        if(err) throw err
        res.json(data)
    })
})

// 4

router.put("/api/movies/:movie_id" , (req , res)=>{
    movies.findByIdAndUpdate(req.params.movie_id , req.body , (err , data)=>{
        if(err) throw err
        res.json(data)
    })
})

// 5

router.delete("/api/movies/:movie_id" , (req, res)=>{
    movies.findByIdAndDelete(req.params.movie_id , (err , data)=>{
        if(err) throw err
        res.json(data)
    })
})

//  6

router.get("/api/movies/top10/cinema" , (req , res)=>{
    const promise = movies.find({}).sort({year: -1}).limit(5)
    promise.then((data) => {
        res.json(data)
    })
    promise.catch((err) => {
        console.log(err);
    })
})

// 7

router.get("/api/movies/between/:start_year/:end_year" , (req, res)=>{
    const {start_year , end_year} = req.params
    const promise = movies.find({year: {"$gte": (start_year) , "$lte": (end_year)}})
    promise.then(data=>{
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

module.exports=router