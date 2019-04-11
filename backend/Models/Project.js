const mongoose= require('mongoose');
const Schema=mongoose.Schema;

let Project= new Schema({
    taskName:{
        type: String
    },
    description:{
        type: String
    },
    priority:{
        type: String
    },
    completed:{
        type:Boolean
    }
});

module.exports=mongoose.model('Project',Project);