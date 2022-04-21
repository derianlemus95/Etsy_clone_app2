import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';

class Delete extends Component{
    constructor(props){
        super(props);
        this.state={
            BookID: "",
            message: "",
            success: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        axios.post("http://127.0.0.1:3001/book/delete",{BookID: this.state.BookID})
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
    };

    render(){
        //if not logged in go to login page
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(this.state.success){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div class="container">
                {redirectVar}
                <form onSubmit={this.onSubmit}>
                    <div style={{color: "#ff0000"}}>{this.state.message}</div>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" name="BookID" onChange = {this.onChange} placeholder="Search a Book by Book ID" pattern="^[0-9]+$" title="Book ID should be a number" required/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;