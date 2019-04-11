import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './create.css'
import axios from 'axios';

export default class CreateTodo extends Component {
    constructor(props){
        super(props);
        this.state={
            taskName:'',
            description:'',
            priority:'',
            completed:true
        }
    }

    handleValues=(e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        const {taskName,description,priority,completed} = this.state;
        const addData ={
            "taskName": taskName,
            "description": description ,
            "priority": priority,
            "completed": completed,
        };
        axios
            .post('http://localhost:5000/project/add', addData)
            .then(res => {
                console.log("success",res.data);
                this.props.history.push('/');
             })
            .catch(err=>{
                console.log(err)
            })
        ;
        console.log("taskname...", taskName,description,priority,completed);
        this.setState({
            description:'',priority:'',completed:'',taskName:''
        })
    };

    render() {
        const {taskName,description,priority,completed} = this.state;
        return (
            <React.Fragment>
                <div className={'row'}>
                <div className={'col-md-4'}>
                </div>
                <div className={'col-md-3 form-name'}>
                    <h2>Create Task</h2>
                    <Form >
                        <FormGroup>
                            <Label>Task Name</Label>
                            <Input type="text"
                                   name="taskName"
                                   placeholder="Task Name"
                                   onChange={this.handleValues}
                                   value={taskName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input type="text"
                                   name="description"
                                   placeholder="Task Description"
                                   onChange={this.handleValues}
                                   value={description}
                            />
                        </FormGroup>
                        <div className={'radio-line'}>
                        <FormGroup check >
                            <Label check>
                                <Input type="radio" name="priority" value="High"
                                       onChange={this.handleValues}
                                       checked={priority==='High'}
                                />{' '}High
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="priority" value="Medium"
                                       onChange={this.handleValues}
                                       checked={priority==='Medium'}
                                />{' '}Medium

                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="priority" value="Low"
                                       onChange={this.handleValues}
                                       checked={priority==='Low'}
                                />{' '}Low

                            </Label>
                        </FormGroup>
                        </div>
                        <div className={'submit-btn'}>
                            <Button color={'primary'}
                             onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </Form>
                </div>
                <div className={'col-md-3'}>
                </div>
                </div>
            </React.Fragment>
        )
    }
}
