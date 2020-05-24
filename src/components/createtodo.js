import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

export default function CreateTodo(props) {
  const [todo_description, set_todo_description] = useState("");
  const [todo_responsible, set_todo_responsible] = useState("");
  const [todo_priority, set_todo_priority] = useState("");
  const [todo_completed, set_todo_completed] = useState(false);
  // const [todo_completed, set_todo_completed] = useState(
  //   (todo_completed = ) => !todo_completed
  // );

  const handle_set_description = (e) => set_todo_description(e.target.value);
  const handle_set_todo_responsible = (e) =>
    set_todo_responsible(e.target.value);
  const handle_set_todo_priority = (e) => set_todo_priority(e.target.value);
  //   const handle_set_todo_completed = (e) => set_todo_completed(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      "submit values:",
      todo_description,
      todo_responsible,
      todo_priority,
      todo_completed
    );
    const newTodo = {
      todo_description: todo_description,
      todo_responsible: todo_responsible,
      todo_priority: todo_priority,
      todo_completed: todo_completed,
    };
    axios
      .post("http://localhost:4000/todos/add", newTodo)
      .then((res) => console.log(res.data)).then(() => props.history.push("/"));
    set_todo_description("");
    set_todo_responsible("");
    set_todo_priority("");
    set_todo_completed(false);
  };

  useEffect(() => {
    console.log("mounted or updated");
  });

  return (
    <Container style={{ marginTop: 10 }}>
      <Form onSubmit={onSubmit}>
        <Form.Label>
          <h3>Create New Todo</h3>
        </Form.Label>
        <Form.Group controlId="formDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            value={todo_description}
            onChange={handle_set_description}
          />
        </Form.Group>
        <Form.Group controlId="formResponsible">
          <Form.Label>Responsible:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Responsible"
            value={todo_responsible}
            onChange={handle_set_todo_responsible}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check inline>
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
          </Form.Check>
          <Form.Check inline>
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
          </Form.Check>
          <Form.Check inline>
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
          </Form.Check>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Todo
        </Button>
      </Form>
    </Container>
  );
}
