import React, { Component } from "react";

import AppHeader from "../app-header";
import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";
import SwapiService from "../../services/swapi-service";

import "./app.css";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    items: this.props.items,
    filter: "all",
    search: ""
  };

  createItem(item) {
    console.log("ITEM", item.label);
    return {
      id: item.id,
      label: item.label,
      important: false,
      done: false
    };
  }

  onItemAdded = itemFromForm => {
    this.setState(state => {
      const item = this.createItem(itemFromForm);
      return { items: [...state.items, item] };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  onToggleDone = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, "done");
      return { items };
    });
  };

  onToggleImportant = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, "important");
      return { items };
    });
  };

  onDelete = id => {
    this.swapiService.deleteItem(id, this.onDeleteItemState;

    // this.setState(state => {
    //   const idx = state.items.findIndex(item => item.id === id);
    //   const items = [
    //     ...state.items.slice(0, idx),
    //     ...state.items.slice(idx + 1)
    //   ];
    //   return { items };
    // });
  };

  onDeleteItemState(id) {
    console.log("onDeleteItemState", id);
    this.setState(state => {
      const idx = state.items.findIndex(item => item.id === id);
      const items = [
        ...state.items.slice(0, idx),
        ...state.items.slice(idx + 1)
      ];
      return { items };
    });
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  onSearchChange = search => {
    this.setState({ search });
  };

  filterItems(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter(item => !item.done);
    } else if (filter === "done") {
      return items.filter(item => item.done);
    }
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  render() {
    const { items, filter, search } = this.state;
    const doneCount = items.filter(item => item.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.searchItems(
      this.filterItems(items, filter),
      search
    );
    const iD = items.length != 0 ? items[items.length - 1].id : items.length;

    console.log("Statre", items.length);
    return (
      <div className="todo-app">
        <AppHeader toDo={toDoCount} done={doneCount} />

        <div className="search-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />

          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        {/* {console.log("App", this.props)} */}
        <TodoList
          items={visibleItems}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onDelete={this.onDelete}
        />

        <ItemAddForm onItemAdded={this.onItemAdded} iD={iD} />
      </div>
    );
  }
}
