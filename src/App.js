import React, { Component } from "react";
import "./style.css";

import Todo from "./components/Todo";

export default class App extends Component {
  state = {
    todos: []
  };

  addTodo = event => {
    if (event.key === "Enter") {
      this.setState({
        todos: [
          ...this.state.todos,
          { id: Math.random(), text: event.target.value }
        ]
      });
    }
  };

  render() {
    return (
      <div style={styles.container}>
        <h1>Todos</h1>
        <input onKeyPress={this.addTodo} />
        {this.state.todos.map(todo => (
          <Todo key={todo.id} title={todo.text} />
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};
