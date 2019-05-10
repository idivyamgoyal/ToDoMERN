import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteToDo extends Component{
    constructor(props){
        super(props);

        /* Binding of this.deleteToDo */
        this.deleteToDo = this.deleteToDo.bind(this);

    }

    /* GET request for DELETING ToDo by ID from the Database */
    deleteToDo(){
        axios.get(`http://localhost:4000/delete/${this.props.match.params.id}`).then(response => {
            window.alert("Deleted ToDo Succssfully");
        }).catch(error => {
            console.log(error);
        });

        /* Switching back to the Main Page */
        this.props.history.push('/');
    }
    


    render(){
        console.log(this.props);
        return(
            <div>
                {this.deleteToDo()}
            </div>
        );
    };
}