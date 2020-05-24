import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import CreateTodo from "./components/createtodo";
import EditTodo from "./components/edittodo";
import TodoList from "./components/todoslist";
import { Navbar, Nav } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              alt="CodingTheSmartWay.com"
            />
            <Nav.Link
              href="https://codingthesmartway.com"
              target="_blank"
              className="navbar-brand"
            >
              MERN-Stack Todo App
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" className="nav-link">
                Todos
              </Nav.Link>
              <Nav.Link href="/create" className="nav-link">
                Create Todo
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
      </div>
    </Router>
  );
}

export default App;
