import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class EditTodoForm extends Component{
    constructor(props){
        super(props);

        /* Binding Functions */
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        /* Initial State */
        this.state = {
            todoDescription: '',
            todoResponsible: '',
            todoPriority: 'Low',
            todoCompleted: false
        }
    }

    /* To get the ToDo List */
    componentDidMount(){
        axios.get(`http://localhost:4000/${this.props.todo.match.params.id}`).then(response => {
            this.setState({
                todoDescription: response.data.todoDescription,
                todoResponsible: response.data.todoResponsible,
                todoPriority: response.data.todoPriority,
                todoCompleted: response.data.todoCompleted
            });
        }).catch(error => {
            console.log(error.message);
        });
    }

    /* On-Event Functions */
    onChangeTodoDescription(e){
        this.setState({
            todoDescription: e.target.value
        });
    }
    
    onChangeTodoResponsible(e){
        this.setState({
            todoResponsible: e.target.value
        });
    }

    onChangeTodoPriority(e){
        this.setState({
            todoPriority: e.target.value
        });
    }

    onChangeTodoCompleted(){
        this.setState({
            todoCompleted: !this.state.todoCompleted
        });
    }

    onSubmit(e){
        /* to prevent default behaviour of HTML */
        e.preventDefault();

        /* LocalTodo to be created in the database */
        const localTodo= {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        }

        /* Sending UPDATE request via http */
        axios.post(`http://localhost:4000/update/${this.props.todo.match.params.id}`, localTodo).then(res => console.log(res.data));
        window.alert('ToDo has been updated successfully!');

        /* Switching back to the Main Page */
        this.props.todo.history.push('/');
    }

    render(){
        return(
            <div>
                <h3>Edit ToDo!</h3>
                <form onSubmit={this.onSubmit}>

                    {/* CreateToDO */}
                    <div className='form-group'>
                        <label>Description</label>
                        <input type='text' className='form-control' value={this.state.todoDescription} onChange={this.onChangeTodoDescription} />
                    </div>

                    {/* ToDoResponsible */}
                    <div className='form-group'>
                        <label>Responsible</label>
                        <input type='text' className='form-control' value={this.state.todoResponsible} onChange={this.onChangeTodoResponsible} />
                    </div>

                    {/* ToDo Priority */}
                    <div className='form-group'>
                        <div className='form-check form-check-inline'>
                            <input type='radio' name='priorityOptions' id='priorityLow' value='Low' checked={this.state.todoPriority==='Low'} onChange={this.onChangeTodoPriority} />
                            <label className='form-check-label'>Low</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input type='radio' name='priorityOptions' id='priorityMedium' value='Medium' checked={this.state.todoPriority==='Medium'} onChange={this.onChangeTodoPriority} />
                            <label className='form-check-label'>Medium</label>
                        </div>
                        <div className='form-check form-check-inline'>
                            <input type='radio' name='priorityOptions' id='priorityLow' value='High' checked={this.state.todoPriority==='High'} onChange={this.onChangeTodoPriority} />
                            <label className='form-check-label'>High</label>
                        </div>
                    </div>

                    {/* CheckBox for Task Completion */}
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input' name='taskCompleted' id='taskCompleted' onChange={this.onChangeTodoCompleted} value={this.state.todoCompleted} />
                        <label className='form-check-label' htmlFor='taskCompleted' >Completed</label>
                    </div>

                    <br/>

                    {/* Submit Button */}
                    <div className='form-group'>
                        <input type='submit' value='Update Todo' className='btn btn-primary' />
                    </div>
                </form>

                {/* Delete button for Requesting DELETION */}
                <div className='form-group'>
                    <Link to={`/delete/${this.props.todo.match.params.id}`}>
                        <button className='btn btn-danger'>Delete ToDo</button>
                    </Link>
                </div>
            </div>
        );
    };
}