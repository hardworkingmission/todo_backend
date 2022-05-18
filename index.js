const express= require('express')
const app= express()
const cors= require('cors')
const port= process.env.PORT ||5000
require('dotenv').config()

app.use(express.json())
app.use(cors({origin:true}))


const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ktecw.mongodb.net/?retryWrites=true&w=majority`

app.get('/',async(req,res)=>{
    res.send('Welcome to Todo List')
})

app.listen(port,()=>{
    console.log('Listening on',port)
})