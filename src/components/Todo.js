import React from "react";
import PropTypes from "prop-types";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  separator: {
    height: "1px",
    background: "#c1c1c1"
  },
  button: {
    background: "none",
    border: "0",
    outlineWidth: "0"
  }
};

export default function Todo({ todo, remove, update }) {
  return (
    <>
      <div style={styles.container}>
        <input type="checkbox" defaultChecked={!todo.active} onClick={update} />
        <p
          style={{
            textDecoration: todo.active ? "none" : "line-through",
            fontSize: "24px"
          }}
        >
          {todo.text}
        </p>
        <button style={styles.button} onClick={remove}>
          X
        </button>
      </div>
      <div style={styles.separator} />
    </>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
};
