import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'
const URL_PHP ='http://localhost/angular_crud_with_pre/php/select.php?page=1&search_input'

export default class Todo extends Component {
    constructor(props){
        super(props)
        this.state = { description: '', list: [] }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()
        
    }

    refresh() {
        axios.get(URL)
          .then(resp => this.setState({...this.state , description:'', list : resp.data}))
        
          console.log(this.state.list)
    }

    handleAdd(){
        const description = this.state.description
        axios.post(URL, {description})
             .then(resp => this.refresh())
    }

    handleChange(e){
        this.setState({...this.state , description: e.target.value })
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp=> this.refresh(this.state.description))
    }

    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm description = {this.state.description}
                    handleChange = {this.handleChange}
                    handleAdd={this.handleAdd}/>
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}/>
            </div>
        )
    }
    
}