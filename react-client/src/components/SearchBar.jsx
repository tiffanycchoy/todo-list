import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  handleSubmit(e) {
    if (e.keyCode === 13 || e.target.type === 'submit') {
      this.props.search(this.state.searchText);
    }
  }

  render() {
    return (
      <div>
        <input
          type = "text"
          placeholder = "Search"
          onChange = {this.handleChange}
          onKeyDown = {this.handleSubmit}
          className = "input-field search-bar"
        />
        <button
          className = "glyphicon glyphicon-search search-button"
          onClick = {this.handleSubmit}>
        </button>
      </div>
    )
  }
}


export default SearchBar;
