import React from "react";
import PropTypes from "prop-types";

const styles = {
  container: {
    display: "flex"
  }
};

export default function Todo({ todo, remove }) {
  return (
    <div style={styles.container}>
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
