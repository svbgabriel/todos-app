import React, { useState, useEffect, useMemo } from "react";
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
  const [filter, setFilter] = useState("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "done":
        return todos.filter(todo => todo.active !== true);
      case "notdone":
        return todos.filter(todo => todo.active !== false);
      default:
        return todos;
    }
  }, [filter, todos]);

  const notDoneCount = useMemo(() => {
    return todos.filter(todo => todo.active !== false).length;
  }, [todos]);

  const deleteTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  const updateTodo = id => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.active = !todo.active;
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("@todos-app:todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(event) {
    if (event.key === "Enter") {
      setTodos([
        ...todos,
        { id: Math.random(), text: event.target.value, active: true }
      ]);
      event.target.value = "";
    }
  }

  return (
    <div style={styles.container}>
      <h1>Todos</h1>
      <input onKeyPress={addTodo} />
      {filteredTodos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          remove={() => deleteTodo(todo.id)}
          update={() => updateTodo(todo.id)}
        />
      ))}
      <p>{`Faltam ${notDoneCount} tarefas`}</p>
      <button onClick={() => setFilter("all")}>Todos</button>
      <button onClick={() => setFilter("notdone")}>Ativos</button>
      <button onClick={() => setFilter("done")}>Completos</button>
    </div>
  );
}
