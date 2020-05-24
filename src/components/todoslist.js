import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default function TodosList() {
  useEffect(() => {
    axios
      .get("http://localhost:4000/todos/")
      .then((response) => {
        set_todos(() => response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [todos, set_todos] = useState([]);

  return (
    <div className="container">
      <h3>Todos List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(function (currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
