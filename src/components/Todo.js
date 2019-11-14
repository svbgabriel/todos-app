import React from "react";
import PropTypes from "prop-types";

function Todo({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

Todo.defaultProps = {
  title: "Todo padrão"
};

Todo.propTypes = {
  title: PropTypes.string
};

export default Todo;
