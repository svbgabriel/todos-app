import { useState, useEffect, useMemo, CSSProperties, KeyboardEvent } from "react";
import "./style.css";

import Todo from "./components/Todo";
import { TodoType, FilterType } from "./types";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box"
  } as CSSProperties,
  containerTodos: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    width: "100%",
    maxWidth: "500px",
    height: "70vh",
    minHeight: "400px",
    maxHeight: "800px",
    padding: "15px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box"
  } as CSSProperties,
  header: {
    width: "100%",
    flexShrink: 0
  } as CSSProperties,
  main: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden"
  } as CSSProperties,
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "14px",
    color: "#777",
    flexShrink: 0
  } as CSSProperties,
  containerButtons: {
    display: "flex",
    gap: "5px"
  } as CSSProperties,
  input: {
    border: "none",
    height: "32px",
    fontSize: "24px",
    width: "100%",
    padding: "16px",
    boxSizing: "border-box",
    outlineWidth: "0",
    flexShrink: 0
  } as CSSProperties,
  separator: {
    height: "1px",
    background: "#ededed",
    flexShrink: 0
  } as CSSProperties,
  title: {
    fontSize: "80px",
    fontWeight: "100",
    textAlign: "center",
    color: "rgba(175, 47, 47, 0.15)",
    margin: "0",
    flexShrink: 0
  } as CSSProperties,
  removeButton: {
    border: "0",
    outlineWidth: "0",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: "#777"
  } as CSSProperties,
  filterButton: (isActive: boolean): CSSProperties => ({
    outlineWidth: "0",
    background: "none",
    borderRadius: "3px",
    border: isActive ? "1px solid rgba(175, 47, 47, 0.2)" : "1px solid transparent",
    padding: "3px 7px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#777"
  })
};

const TODO_STORAGE_KEY = "@todos-app:todos";

export default function App() {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const saved = localStorage.getItem(TODO_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "all":
        return todos;
      case "done":
        return todos.filter(todo => !todo.active);
      case "pending":
        return todos.filter(todo => todo.active);
      default:
        return todos;
    }
  }, [filter, todos]);

  const pendingCount = useMemo(() => {
    return todos.filter(todo => todo.active).length;
  }, [todos]);

  const deleteTodo = (id: string) => setTodos(prev => prev.filter(todo => todo.id !== id));

  const deleteDoneTodos = () =>
    setTodos(prev => prev.filter(todo => todo.active));

  const updateTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo => 
        todo.id === id ? { ...todo, active: !todo.active } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo(event: KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (event.key === "Enter" && target.value.trim() !== "") {
      const newTodo: TodoType = {
        id: crypto.randomUUID(),
        text: target.value.trim(),
        active: true
      };
      setTodos(prev => [...prev, newTodo]);
      target.value = "";
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>tarefas</h1>
      <div style={styles.containerTodos}>
        <header style={styles.header}>
          <input
            style={styles.input}
            placeholder="O que precisa ser feito?"
            onKeyDown={handleAddTodo}
            autoFocus
          />
        </header>
        <div style={styles.separator} />
        <main style={styles.main}>
          {filteredTodos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              remove={() => deleteTodo(todo.id)}
              update={() => updateTodo(todo.id)}
            />
          ))}
        </main>
        {todos.length !== 0 && (
          <footer style={styles.footer}>
            <span>{pendingCount === 1 ? '1 tarefa pendente' : `${pendingCount} tarefas pendentes`}</span>
            <div style={styles.containerButtons}>
              <button
                style={styles.filterButton(filter === "all")}
                onClick={() => setFilter("all")}
              >
                Todos
              </button>
              <button
                style={styles.filterButton(filter === "pending")}
                onClick={() => setFilter("pending")}
              >
                Ativos
              </button>
              <button
                style={styles.filterButton(filter === "done")}
                onClick={() => setFilter("done")}
              >
                Completos
              </button>
            </div>
            <button
              style={styles.removeButton}
              onClick={deleteDoneTodos}
            >
              Limpar completos
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
