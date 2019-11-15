import React from "react";
import PropTypes from "prop-types";

const styles = {
  container: {
    display: "flex"
  }
};

export default function Todo({ todo, remove, update }) {
  return (
    <div style={styles.container}>
      <button onClick={update}>U</button>
      <p>{todo.text}</p>
      <button onClick={remove}>X</button>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
};
