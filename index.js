const express = require("express");
const app = express();
const port = 8080;
const Task = require("./model/tasks");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:/tasks",()=>{
    console.log("database connected");
});

app.use(express.json())

app.post("/v1/tasks",async(req,res)=>{
    if(req.body.tasks){
        try {
            const tasks = await Task.insertMany(req.body.tasks.map((data)=> {return {title : data.title, is_completed : data.is_completed}}));
            res.status(201).json({
            tasks : tasks.map((data)=>{return {id : data._id}})
            })
        } catch (error) {
            
        }
    }
    else{
        try {
            const task = await Task.create(req.body);
            res.status(201).json({
                id : task._id
            })
        } catch (error) {
            res.json({
                error
            })
        }
    }
    

})
app.get("/v1/tasks",async(req,res)=>{
    try {
        const task = await Task.find();
        res.status(200).json({
            task : task
        })
    } catch (error) {
        res.json({
            status : "falilure"
        })
    }
    
})
app.get("/v1/tasks/:id",async(req,res)=>{
    
    try {
        const tasks = await Task.findById(req.params.id);
        res.status(200).json({
            tasks
        })
    } catch (error) {
        res.status(400).json({
            error: "There is no task at that id"
        })
    }
})
app.put("/v1/tasks/:id",async(req,res)=>{
    try {
        const tasks = await Task.updateOne({_id :req.params.id},{title: req.body.title, is_completed : req.body.is_completed});
        res.status(204).json({})
    } catch (error) {
        res.status(404).json({
            error: "There is no task at that id"
        })
    }
})
app.delete("/v1/tasks/:id",async(req,res)=>{

        const tasks = await Task.deleteOne({_id :req.params.id});
        res.status(204).json({
            
        })
    
})
app.delete("/v1/tasks",async(req,res)=>{

    const tasks = await Task.deleteMany({_id : req.body.tasks.map(data=>data.id)});
    res.status(204).json({
        
    })

})
app.listen(port, ()=>{
    console.log(`app listen at ${port}`);
})