import React from "react";
import PropTypes from "prop-types";
class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.item.label,
    };
  }

  handleTitleChange = (e) => {
    this.setState({ label: e.target.value });
  };

  // onSubmit = (e) => {
  //   e.preventDefault();
  //   // this.props.onItemAdded(this.state.label);
  //   this.setState({
  //     label: "",
  //   });
  // };

  render() {
    return (
      <div>
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          name="item[label]"
          value={this.state.label}
          onChange={this.handleTitleChange}
        />

        <button className="btn btn-outline-secondary">Add Item</button>
      </div>
    );
  }
}

export default PostForm;
