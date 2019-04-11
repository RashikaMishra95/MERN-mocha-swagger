import React, { Component } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {Table} from "reactstrap";

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project : []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/project/list')
            .then(response => {
                this.setState({ project : response.data });
                console.log("state--", this.state.project);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        const {project}=this.state;
        return (
            <div>
                <Row>
                    <Col md={3}>
                    </Col>
                    <Col md={5}>
                        <Table striped style={{marginTop: 20}}>
                            <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            {project.map((p, i) => {
                                return (
                                    <tbody>
                                    <tr>
                                        <td>{p.taskName}</td>
                                        <td>{p.description}</td>
                                        <td>{p.priority}</td>
                                        <Link to={`/edit/${p._id}`}>Edit</Link>
                                    </tr>
                                    </tbody>
                                );
                            })}
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}
