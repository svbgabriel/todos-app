import React, { useState, useEffect } from "react";
import "./style.css";

import Todo from "./components/Todo";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

export default function App() {
  const getTodos = () =>
    JSON.parse(localStorage.getItem("@todos-app:todos")) || [];

  const [todos, setTodos] = useState(getTodos);

  const deleteTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  useEffect(() => {
    localStorage.setItem("@todos-app:todos", JSON.stringify(todos));
  }, [todos]);

  async function addTodo(event) {
    if (event.key === "Enter") {
      setTodos([
        ...todos,
        { id: Math.random(), text: event.target.value, active: true }
      ]);
    }
  }

  return (
    <div style={styles.container}>
      <h1>Todos</h1>
      <input onKeyPress={addTodo} />
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} remove={() => deleteTodo(todo.id)} />
      ))}
    </div>
  );
}
