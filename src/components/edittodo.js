import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditTodo(props) {
  const [todo_description, set_todo_description] = useState("");
  const [todo_responsible, set_todo_responsible] = useState("");
  const [todo_priority, set_todo_priority] = useState("");
  const [todo_completed, set_todo_completed] = useState(false);

  const handle_set_description = (e) => set_todo_description(e.target.value);
  const handle_set_todo_responsible = (e) =>
    set_todo_responsible(e.target.value);
  const handle_set_todo_priority = (e) => set_todo_priority(e.target.value);
  const handle_set_todo_completed = (e) => set_todo_completed(!todo_completed);

  useEffect(() => {
    axios
      .get("http://localhost:4000/todos/" + props.match.params.id)
      .then((response) => {
        set_todo_description(response.data.todo_description);
        set_todo_responsible(response.data.todo_responsible);
        set_todo_priority(response.data.todo_priority);
        set_todo_completed(response.data.todo_completed);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.match.params.id]);

  function onSubmit(e) {
    e.preventDefault();
    const obj = {
      todo_description: todo_description,
      todo_responsible: todo_responsible,
      todo_priority: todo_priority,
      todo_completed: todo_completed,
    };
    console.log(obj);
    axios
      .post("http://localhost:4000/todos/update/" + props.match.params.id, obj)
      .then((res) => console.log(res.data))
      .then(() => props.history.push("/"));
  }

  return (
    <div>
      <h3 align="center">Update Todo</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            className="form-control"
            value={todo_description}
            onChange={handle_set_description}
          />
        </div>
        <div className="form-group">
          <label>Responsible: </label>
          <input
            type="text"
            className="form-control"
            value={todo_responsible}
            onChange={handle_set_todo_responsible}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={todo_priority === "Low"}
              onChange={handle_set_todo_priority}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={todo_priority === "Medium"}
              onChange={handle_set_todo_priority}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={todo_priority === "High"}
              onChange={handle_set_todo_priority}
            />
            <label className="form-check-label">High</label>
          </div>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            id="completedCheckbox"
            type="checkbox"
            name="completedCheckbox"
            onChange={handle_set_todo_completed}
            checked={todo_completed}
            value={todo_completed}
          />
          <label className="form-check-label" htmlFor="completedCheckbox">
            Completed
          </label>
        </div>

        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Todo"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
