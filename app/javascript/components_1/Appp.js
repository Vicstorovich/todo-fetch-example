import React, { Component } from "react";
import $ from "jquery";

import AppHeader from "./app-header";
import SearchPanel from "./search-panel";
import TodoList from "./todo-list";
import ItemStatusFilter from "./item-status-filter";
import ItemAddForm from "./item-add-form";

import "./app.css";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: this.props.todoData
  };

  deleteItem = id => {
    $.ajax({
      url: `/items/${id}`,
      type: "DELETE",
      success: () => {
        this.removeItemClient(id);
      }
    });
  };

  removeItemClient = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray
      };
    });
  };

  createTodoItem(label) {
    return {
      id: label.id,
      label: label.label,
      important: false,
      done: false
    };
  }

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr
      };
    });
  };

  newItem(id, propName) {
    const arr = this.state.todoData;
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };
    return newItem;
  }

  updateItem(id, propName) {
    $.ajax({
      url: `/items/${id}`,
      type: "PUT",
      data: { item: this.newItem(id, propName) },
      success: () => {
        this.setState(({ todoData }) => {
          return {
            todoData: this.toggleProperty(todoData, id, propName)
          };
        });
      }
    });
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);

    const newItem = this.newItem(id, propName);

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = id => {
    this.updateItem(id, "done");
  };

  onToggleImportant = id => {
    this.updateItem(id, "important");
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    // todoData.forEach((emotion) => console.log(emotion.id));
    const iD =
      todoData.length != 0 ? todoData[todoData.length - 1].id : todoData.length;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        {console.log(this.todoData)}
        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm onItemAdded={this.addItem} iD={iD} />
      </div>
    );
  }
}
