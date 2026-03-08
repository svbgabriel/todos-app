import { CSSProperties } from "react";
import { TodoType } from "../types";
import * as React from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0"
  } as CSSProperties,
  separator: {
    height: "1px",
    background: "#ededed"
  } as CSSProperties,
  todoContent: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1
  } as CSSProperties,
  checkbox: {
    width: "20px",
    height: "20px",
    cursor: "pointer"
  } as CSSProperties,
  text: (isDone: boolean): CSSProperties => ({
    textDecoration: isDone ? "line-through" : "none",
    fontSize: "24px",
    color: isDone ? "#d9d9d9" : "#4d4d4d",
    transition: "color 0.4s",
    margin: 0,
    cursor: "pointer"
  }),
  button: {
    background: "none",
    border: "0",
    outlineWidth: "0",
    color: "#cc9a9a",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0 10px",
    visibility: "visible"
  } as CSSProperties
};

interface TodoProps {
  todo: TodoType;
  remove: () => void;
  update: () => void;
}

const Todo: React.FC<TodoProps> = ({ todo, remove, update }) => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.todoContent} onClick={update}>
          <input 
            type="checkbox" 
            checked={!todo.active} 
            onChange={() => {}} // Controlled via parent update
            style={styles.checkbox}
            aria-label={todo.text}
            title={`Marcar "${todo.text}" como ${todo.active ? 'concluída' : 'pendente'}`}
          />
          <p style={styles.text(!todo.active)}>
            {todo.text}
          </p>
        </div>
        <button 
          style={styles.button} 
          onClick={remove}
          title="Remover tarefa"
          aria-label="Remover tarefa"
        >
          ×
        </button>
      </div>
      <div style={styles.separator} />
    </>
  );
}

export default Todo;
