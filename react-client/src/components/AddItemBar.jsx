import React from 'react';

class AddItemBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDescription: '',
      itemCategory: ''
    }
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleDescriptionChange(e) {
    this.setState({
      itemDescription: e.target.value
    })
  }

  handleCategoryChange(e) {
    this.setState({
      itemCategory: e.target.value
    })
  }

  handleClick() {
    this.props.addItem(this.state.itemDescription, this.state.itemCategory);
    this.setState({
      itemDescription: '',
      itemCategory: ''
    })
  }

  render() {
    return (
      <div>
          <input
            type = "text"
            placeholder = "Todo Item"
            value = {this.state.itemDescription}
            onChange = {this.handleDescriptionChange}
            className = "input-field"
          />
          <input
            type="text"
            placeholder="Category"
            value = {this.state.itemCategory}
            onChange = {this.handleCategoryChange}
            className = "input-field left-margin"
          />
          <button
            onClick = {this.handleClick}
            className = "add-item-button left-margin"
          >+
          </button>
      </div>
    )
  }
}

export default AddItemBar;
