const express = require('express');
const Product = require('../models/product.model')
const router = express.Router();


const sendMail = require('../utils/send-mail')




router.post("/", async(req,res) =>{
    try{
      const product = await Product.create(req.body)
      sendMail("gaurav@gmail.com","b@bcom",`created the new product with name ${req.body.name}`,"create the new product","<h1>gaurav maihuria is the best man in the world</h1>")
    

 
      return res.status(201).json({product});      

    }catch(e)
    {
        return res.status(500).json({status:"failed",message:e.message});
    }
})

router.get("/", async(req,res) =>{

    try{


        const page = +req.query.page ||1;
        const size = +req.query.size || 2;

        //page -1 skip(0)limit(2)
        const skip  = (page-1)*size
        const products = await Product.find().skip(skip).limit(size).lean().exec()
       

        const totalpages =Math.ceil(await Product.find().countDocuments()/size)
        return res.json({products,totalpages})

    }catch(e)
    {
        return res.status(500).json({status:"failed",message:e.message});
    }
})

module.exports=router;


