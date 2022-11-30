const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title : String,
    is_completed : {type : Boolean, default: false}
},{versionKey: false})

const task = mongoose.model("tasks", taskSchema);
module.exports = task;