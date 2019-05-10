import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from './components/createTodo.component';
import EditTodo from './components/editTodo.component';
import TodoList from './components/todoList.component';
import DeleteTodo from './components/deleteToDo.component';
import logo from './static/logo.png';

class App extends Component {
  render() {
    return (

      /* Initializing Router */
      <Router>
        <div className="container">
          <nav className='navbar navbar-expand navbar-light bg-light'>
            <a className='navbar-brand' href='/' >
              <img src={logo} width='100px' height='100px' alt='ToDo List' />
            </a>
            <Link to='/' className='navbar-brand'>My TODOs</Link>
            <div className='collpase nav-collapse'>
              <ul className='navbar-nav mr-auto'>
                <li className='navbar-item'>
                  <Link to='/create' className='nav-link'>Create TODO</Link>
                </li>                
              </ul>
            </div>
          </nav>

          {/* Route Paths */}
          <Route path='/' exact component={TodoList} />
          <Route path='/create' component={CreateTodo} />
          <Route path='/edit/:id' component={EditTodo} />
          <Route path='/delete/:id' component={DeleteTodo} />
        </div>
        
      </Router>
    );
  }
}

export default App;
