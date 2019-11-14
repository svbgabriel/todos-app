import React, { useState } from "react";
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
  const [todos, setTodos] = useState([]);

  function addTodo(event) {
    if (event.key === "Enter") {
      setTodos([...todos, { id: Math.random(), text: event.target.value }]);
    }
  }

  return (
    <div style={styles.container}>
      <h1>Todos</h1>
      <input onKeyPress={addTodo} />
      {todos.map(todo => (
        <Todo key={todo.id} title={todo.text} />
      ))}
    </div>
  );
}
