const express= require('express')
const mongoose = require('mongoose');
const app= express()
const cors= require('cors')
const port= process.env.PORT ||5000
require('dotenv').config()

app.use(express.json())
app.use(cors({origin:true}))


const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ktecw.mongodb.net/?retryWrites=true&w=majority`

const main=async()=>{
    await mongoose.connect(uri)

    const taskSchema= new mongoose.Schema({
        task:String,
        description:String,
        initialDate:String,
        dateLine:String,
        email:String,
        status:Boolean
    })
    const Tasks= new mongoose.model('Task',taskSchema)
    //get all tasks
    app.get('/tasks',async(req,res)=>{
        const email=req.query.email
        let tasks
        if(email){
            const individualsTasks= await Tasks.find({email})
            tasks=individualsTasks
        }else{
            const allTasks= await Tasks.find({})
            tasks=allTasks

        }
        res.send(tasks)
    })
    //get single task by id
    app.get('/task/:id',async(req,res)=>{
        const taskId=req.params.id
        const result= await Tasks.findOne({_id:taskId})
        res.send(result)
    })
    //task create
    app.post('/task',async(req,res)=>{
        const task=req.body
        const result = await new Tasks(task)
        result.save()
        res.send(result)
        //console.log(task)
    })
    //task completed
    app.patch('/task/:id',async(req,res)=>{
        const taskId=req.params.id
        const status=req.body
        const result= await Tasks.findOneAndUpdate({_id:taskId},{$set:status})
        res.send(result)
    })
    //delete a task
    app.delete('/task/:id',async(req,res)=>{
        const taskId=req.params.id
        const result= await Tasks.findByIdAndDelete(taskId)
        res.send(result)
    })
    console.log('connected')

}
main().catch(err=>console.log(err))

app.get('/',async(req,res)=>{
    res.send('Welcome to Todo List')
})

app.listen(port,()=>{
    console.log('Listening on',port)
})