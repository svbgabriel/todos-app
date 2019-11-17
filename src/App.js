import React, { useState, useEffect, useMemo } from "react";
import "./style.css";

import Todo from "./components/Todo";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "50px auto"
  },
  containerTodos: {
    background: "#fff",
    minWidth: "350px",
    maxWidth: "500px",
    padding: "10px"
  },
  header: {
    width: "100%"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  containerButtons: {
    display: "flex",
    margin: "0 15px"
  },
  input: {
    border: "none",
    height: "32px",
    fontSize: "24px",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
    outlineWidth: "0"
  },
  separator: {
    height: "1px",
    background: "#c1c1c1"
  },
  title: {
    fontSize: "48px"
  },
  removeButton: {
    border: "0",
    outlineWidth: "0",
    background: "none"
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

  const deleteDoneTodos = () =>
    setTodos(todos.filter(todo => todo.active !== false));

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
      <h1 style={styles.title}>tarefas</h1>
      <div style={styles.containerTodos}>
        <div style={styles.header}>
          <input
            style={styles.input}
            placeholder="O que precisa ser feito?"
            onKeyPress={addTodo}
          />
        </div>
        <div style={styles.separator} />
        {filteredTodos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            remove={() => deleteTodo(todo.id)}
            update={() => updateTodo(todo.id)}
          />
        ))}
        {todos.length !== 0 && (
          <div style={styles.footer}>
            <p>{`Faltam ${notDoneCount} tarefa(s)`}</p>
            <div style={styles.containerButtons}>
              <button
                style={{
                  outlineWidth: "0",
                  background: "none",
                  borderRadius: "5px",
                  borderWidth: filter === "all" ? "2px" : "0"
                }}
                onClick={() => setFilter("all")}
              >
                Todos
              </button>
              <button
                style={{
                  outlineWidth: "0",
                  background: "none",
                  borderRadius: "5px",
                  borderWidth: filter === "notdone" ? "2px" : "0"
                }}
                onClick={() => setFilter("notdone")}
              >
                Ativos
              </button>
              <button
                style={{
                  outlineWidth: "0",
                  background: "none",
                  borderRadius: "5px",
                  borderWidth: filter === "done" ? "2px" : "0"
                }}
                onClick={() => setFilter("done")}
              >
                Completos
              </button>
            </div>
            <button
              style={styles.removeButton}
              onClick={() => deleteDoneTodos()}
            >
              Remover completos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
