const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const director = require("../model/Director")
const { route } = require("./movie")

// router.get("/api/directors" , (req, res)=>{
//     director.find({} , (err , data)=>{
//         if(err) throw err
//         if(data="") res.send("malumot yoq hali")
//         else res.json(data)
//     })
// })

// 2

router.post("/api/directors" , (req, res)=>{
    const db = new director(req.body)
    const promise = db.save()
    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

// 3

router.put("/api/directors/:director_id" , (req, res)=>{
    director.findByIdAndUpdate(req.params.director_id , req.body , (err , data)=>{
        if(err) throw err
        res.json(data)
    })
})

// 4

router.delete("/api/directors/:director_id" , (req, res)=>{
    director.findByIdAndDelete(req.params.director_id , (err , data)=>{
        if(err) throw err
        res.json(data)
    })
})

// 5


router.get("/api/directors" , (req, res)=>{
    const promise = director.aggregate([
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "director_id",
                as: "filmlar"
            }
        },
        {
            $unwind: {
                path: "$filmlar"
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                flimlar: {
                    $push:"$filmlar"
                }
            }
        }
    ])

    promise.then(data=> {
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

// 

router.get("/api/directors/:director_id/best10movie" , (req , res)=>{
    const promise=director.aggregate([
        {
          $match: {
              _id : mongoose.Types.ObjectId(req.params.director_id)
          }  
        },

        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "director_id",
                pipeline: [
                    {
                        $sort:{
                            year : -1
                        }
                    },
                    {
                        $limit: 3
                    }
                ],
                as:"filmlar"
            }
        }
    ])

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        console.log(err);
    })
})

module.exports=router