const express = require('express');
const Router = express.Router();

let todoSchema = require('../models/todo.schema');

/* TODOs Query Manager */
Router.route('/').get((req, res) => {
    todoSchema.find((err, todo) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(todo);
        }
    });
});

/* GET request for ToDo by ID */
Router.route('/:id').get((req, res) => {
    let id = req.params.id;
    todoSchema.findById(id, (err, todo) => {
        if(err)
        console.log(err);
        else 
        res.json(todo);
    });
});

/* POST request for updating ToDo by ID */
Router.route('/update/:id').post((req, res) =>{
    todoSchema.findById(req.params.id, (err, todo) =>{
        if(!todo){
            res.status(404).send('data not found!');
        }
        else
            todo.todoDescription = req.body.todoDescription;
            todo.todoResponsible = req.body.todoResponsible;
            todo.todoPriority = req.body.todoPriority;
            todo.todoCompleted = req.body.todoCompleted;
            
            todo.save().then(todo => {
                res.json('todo updated');
            }).catch(err =>{
                res.status(400).send('update not possible');
            });
    });
});

/* GET request for ToDo by ID to be DELETED from the DataBase */
Router.route('/delete/:id').get((req, res) =>{
    let LocalId = req.params.id;
    todoSchema.findByIdAndDelete(LocalId).then(() => {
        console.log('ToDo found and Deleted!!');
        res.status(200).json({'message': `ToDo Deleted bearing Id:${LocalId}`})
    }).catch(err => {
        console.log(`Unable to Delete ToDo bearing Id:${LocalId}`);
        console.log(err);
    });
});

Router.route('/add').post((req, res) =>{
    let LocalTodo = new todoSchema(req.body);
    LocalTodo.save().then(LocalTodo => {
        res.status(200).json({todo: 'ToDo Added Successfully'});
    }).catch(err => {
        res.status(400).send("Adding New ToDo Failed");
    });
});

module.exports = Router;