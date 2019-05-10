import React, { Component } from 'react';
import EditTodoForm from './editTodoForm.component';
export default class EditTodo extends Component{
    render(){
        return(
            <div>
                {console.log(this.props)}
                <EditTodoForm todo={this.props} />
            </div>
        )
    };
};