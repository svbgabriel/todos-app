import React from "react";
import PropTypes from "prop-types";

const Todo = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

Todo.defaultProps = {
  title: "Todo padrão"
};

Todo.propTypes = {
  title: PropTypes.string
};

export default Todo;
