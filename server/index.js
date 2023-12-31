var express = require("express");
var cors = require("cors");
var app = express();
const { ConnectMongoDb } = require("../database/index");
const {getAllTodos, addTodo,deleteTodo,updateTodo } = require("../database/mongoActions");
app.use(express.json());
app.use(cors());


app.get("/", async function (req, res, next) {
   const results = await getAllTodos();
   res.status(200).json(results)
});

app.post("/addTodo", async function (req, res){
    try {
        if(req.body && req.body.todoName){
            const result = await addTodo(req.body.todoName);
            console.log(result)
            res.status(200).json(result)
        }
    
    } catch (error) {
        console.log(error,"=====");
        res.status(400).json(error)
    }
  
})

app.post('/deleteTodo',async (req,res)=>{
    try {
        if(req.body && req.body.deleteId){
            const result = await deleteTodo(req.body.deleteId);
            res.status(200).json(result)
        }
    } catch (error) {
        console.log(error,"=====");
        res.status(400).json(error)
    }
})

app.post('/updateTodo',async (req,res)=>{
    try {
        console.log("req params", req.body)
        if(req.body){
            const result = await updateTodo(req.body);
            res.status(200).json(result)
        }
       
        
    } catch (error) {
        console.log(error,"=====");
        res.status(400).json(error)
    }
})

app.listen(3002, async function () {
  console.log("CORS-enabled web server listening on port 3002");
  const mongoConnection = await ConnectMongoDb();
  console.log("connection ")
});
