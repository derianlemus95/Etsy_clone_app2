import React, {Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

class Create extends Component{
    constructor(props){
        super(props);
        this.state={
            BookID: "", 
            Title: "",
            Author: "",
            message: "",
            success: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let data = {BookID: this.state.BookID, Title: this.state.Title, Author:this.state.Author};
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post("http://127.0.0.1:3001/book/create", data)
        .then(response => {
                this.setState({
                    success: true
                });
        })
        .catch(error => {
            this.setState({
              message: error.response.data
            })
        });
    }

    render(){
        //if not logged in go to login page
        let redirectVar = null;
        if(!localStorage.getItem('token')) {
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.success){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    <form onSubmit={this.onSubmit}>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="BookID" onChange={this.onChange} placeholder="Book ID" pattern="^[0-9]+$" title="Book ID should be a number" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" class="form-control" name="Title" onChange={this.onChange} pattern="^[A-Za-z0-9 ]+$" placeholder="Book Title" required/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input  type="text" class="form-control" name="Author" onChange={this.onChange} pattern="^[A-Za-z0-9 ]+$" placeholder="Book Author" required/>
                        </div>
                        <br/>
                        <div  style={{color: "#ff0000"}}>{this.state.message}</div>
                        <div style={{width: '30%'}}>
                            <button class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;