import React, { Component } from "react";
import FormErrors from "../form-errors";
import SwapiService from "../../services/swapi-service";

import "./item-add-form.css";

export default class ItemAddForm extends Component {
  swapiService = new SwapiService();

  state = {
    label: "",
    formErrors: { label: "" },
    labelValid: false,
    formValid: false
  };

  onLabelChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let labelValid = this.state.labelValid;

    labelValid = value.length >= 6;
    fieldValidationErrors.label = labelValid ? "" : " is too short";

    this.setState(
      {
        formErrors: fieldValidationErrors,
        labelValid: labelValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.labelValid
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { label } = this.state;
    const { iD } = this.props;
    const newItem = { item: { id: iD + 1, label: label } };

    this.setState({ label: "", formValid: !this.state.formValid });
    this.swapiService.postItem(newItem, this.addNewItemState);
  };

  addNewItemState = item => {
    const cb = this.props.onItemAdded || (() => {});
    return cb(item);
  };

  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <input
          type="text"
          className="form-control new-todo-label"
          name="label"
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
        />

        <button
          type="submit"
          className="btn btn-outline-secondary"
          disabled={!this.state.formValid}
        >
          Add
        </button>
      </form>
    );
  }
}
