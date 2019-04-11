import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import TodosList from "./components/list";
import EditTodo from "./components/edit";
import CreateTodo from "./components/create";
import Header from "./components/header";


class App extends Component {
  render() {
    return (
        <Router>
            <Header/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </Router>
    );
  }
}

export default App;
