// require('dotenv').config()
const express=require('express')
require('./db/config')
const User=require('./db/User')
const Product=require('./db/Product')
const cors=require('cors')

const app=express()
// const PORT=process.env.PORT || 4500

app.use(express.json())
app.use(cors())
app.post('/register',async(req,resp)=>{
    const user=new User(req.body)
    const result=await user.save()
    resp.send(result)
})
app.post('/login',async(req,res)=>{
    if(req.body.password && req.body.email){
        const user=await User.findOne(req.body).select('-password')
        user?res.send(user):res.send({result:'NO user found'})
    }
    else{
        res.sendStatus(404)
    }
    
})

app.post('/addProduct',async(req,res)=>{
    let product=new Product(req.body)
    let result=await product.save()
    res.send(result)
})

app.get('/products',async(req,res)=>{
    let products= await Product.find()
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send({result:'No result found'})
    }
})

app.delete('/product/:id',async(req,res)=>{
    // res.send(req.params)
    let result=await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/product/:id',async(req,res)=>{
    const result=await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result:'No record found'})
    }
})

app.put('/product/:id',async(req,res)=>{
    const result=await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result)
})

app.get('/search/:key',async(req,res)=>{
    const result=await Product.find({
        $or:[
            {name:{$regex: req.params.key}},
            {company:{$regex: req.params.key}}
        ]
    })
    res.send(result)
})


app.listen(4000)