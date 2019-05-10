import React from 'react';
import axios from 'axios';

class Form extends React.Component{

    constructor(props){
        super(props);

        /* Binding Functions */
        this.onChangeToDoDescription=this.onChangeToDoDescription.bind(this);
        this.onChangeToDoResponsible=this.onChangeToDoResponsible.bind(this);
        this.onChangeToDoPriority=this.onChangeToDoPriority.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        /* Initial State */
        this.state={
            todoDescription:'',
            todoResponsible:'',
            todoPriority:'Low',
            todoCompleted:false
        };
    }

    /* On-Event Functions */
    onChangeToDoDescription(e){
        this.setState({
            todoDescription : e.target.value
        });
    }

    onChangeToDoResponsible(e){
        this.setState({
            todoResponsible : e.target.value
        });
    }
    
    onChangeToDoPriority(e){
        this.setState({
            todoPriority : e.target.value
        });
    }
    
    onSubmit(e){
        /* to prevent default behaviour of HTML */
        e.preventDefault();

        /* LocalTodo to be created in the database */
        const newTodo = {
            todoDescription: this.state.todoDescription,
            todoResponsible: this.state.todoResponsible,
            todoPriority: this.state.todoPriority,
            todoCompleted: this.state.todoCompleted
        }

        /* Sending newTodo object via http request */
        axios.post('http://localhost:4000/add', newTodo).then(res => console.log(res.data));

        /* reset the Form */
        this.setState({
            todoDescription:'',
            todoResponsible:'',
            todoPriority:'Low',
            todoCompleted:false
        });
    }

    render(){
        return(

                <div style={{marginTop: 20}}>
                    <h3>Create New ToDo!</h3>
                    <form onSubmit={this.onSubmit}>

                    {/* CreateToDO */}
                        <div className='form-group'>
                            <label>Description:</label>
                            <input type='text' placeholder='ToDo Description' className='form-control' value={this.state.todoDescription} onChange={this.onChangeToDoDescription} />
                        </div>
                    
                    {/* ToDoResponsible */}
                        <div className='form-group'>
                            <label>Responsible:</label>
                            <input type='text' placeholder='ToDo Responsible' className='form-control' value={this.state.todoResponsible} onChange={this.onChangeToDoResponsible} />
                        </div>

                    {/* ToDo Priority */}
                        <div className='form-group'>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='priorityOptions' id='priorityLow' value='Low' checked={this.state.todoPriority==='Low'} onChange={this.onChangeToDoPriority} />
                                <label className='form-check-label'>Low</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='priorityOptions' id='priorityMedium' value='Medium' checked={this.state.todoPriority==='Medium'} onChange={this.onChangeToDoPriority} />
                                <label className='form-check-label'>Medium</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input className='form-check-input' type='radio' name='priorityOptions' id='priorityHigh' value='High' checked={this.state.todoPriority==='High'} onChange={this.onChangeToDoPriority} />
                                <label className='form-check-label'>High</label>
                            </div>
                        </div>

                    {/* Submit Button */}
                        <div className='form-group'>
                            <input type='submit' value='Create ToDo' className='btn btn-primary' />
                        </div>
                    </form>
                </div> 
        );
    }
}

export default Form;