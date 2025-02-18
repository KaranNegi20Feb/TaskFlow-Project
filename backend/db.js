const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://karansinghnegi076:karan12345@cluster0.ctgemy3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  
  const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    assignees: [{ type: String, required: true }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status:{
      type:String,
      required:true
    }
  });

  const TaskSchema2 = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    assignees: [{ type: String, required: true }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status:{
      type:String,
      required:true
    }
  });

  const TaskSchema3 = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    assignees: [{ type: String, required: true }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status:{
      type:String,
      required:true
    }
  });

  const TaskSchema4 = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    assignees: [{ type: String, required: true }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status:{
      type:String,
      required:true
    }
  });

  const TaskSchema5 = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    assignees: [{ type: String, required: true }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status:{
      type:String,
      required:true
    }
  });


  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
});

const Task = mongoose.model('Task', TaskSchema);
const Task2 = mongoose.model('Task2', TaskSchema2);
const Task3 = mongoose.model('Task3', TaskSchema3);
const Task4 = mongoose.model('Task4', TaskSchema4);
const Task5 = mongoose.model('Task5', TaskSchema5);

const User = mongoose.model('User', UserSchema);

module.exports = { User, Task, Task2, Task3,Task4,Task5 };
  

