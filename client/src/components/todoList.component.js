import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => (

    /* Displaying Data in Rows on the browser with ACTIONS that can be performed */
    <tr>
        <td className={props.todo.todoCompleted ? 'completed' : ''} >{ props.todo.todoDescription }</td>
        <td className={props.todo.todoCompleted ? 'completed' : ''} >{ props.todo.todoResponsible }</td>
        <td className={props.todo.todoCompleted ? 'completed' : ''} >{ props.todo.todoPriority }</td>
        <td>
            <Link to={`/edit/${props.todo._id}`}>Edit</Link> 
        </td>
        <td>
            <Link to={`/delete/${props.todo._id}`}>Delete</Link> 
        </td>
    </tr>
)

export default class TodoList extends Component{

    constructor(props){
        super(props);
        this.state = { todos: [] };
    }

    /* To get the ToDo List */
    componentDidMount(){
        axios.get('http://localhost:4000/').then(response => {this.setState({todos: response.data});
         })
        .catch(error => console.log(error));
    }

    /* To get the ToDo List After Update */
    componentDidUpdate(){
        axios.get('http://localhost:4000/').then(response => {this.setState({todos: response.data});
        })
        .catch(error => console.log(error));
    }

    /* Mapping received TODO DATA */
    currentTodoList(){
        return this.state.todos.map((currentTodo, i) =>{
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render(){
        return(
            <div>
                <h3>ToDo List!!!</h3>
                <table className='table table-striped' style={{marginTop:20 }}>

                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Edit ToDo</th>
                            <th>Delete ToDo</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        { this.currentTodoList() }
                    </tbody>
            </table>

            {/* Create TODO Button */}
            <div>
            <Link to={`/create`}><input type='submit' value='Create New TODO' className='btn btn-primary' /></Link>
            </div>
            </div>
        );
    };
}