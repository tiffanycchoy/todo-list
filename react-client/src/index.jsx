import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import AddItemBar from './components/AddItemBar.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterBar from './components/FilterBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      filter: 'show_all',
      searchTerm: ''
    }
    this.retrieve = this.retrieve.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.retrieve();
  }

  retrieve() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/items',
      data: {filter: context.state.filter, searchTerm: context.state.searchTerm},
      success: (data) => {
        this.setState({
          todoItems: data
        })
      },
      error: (err) => {
        console.log('GET request error: ', err);
      }
    });
  }

  addItem(description, category) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/items',
      data: {
        description: description,
        category: category,
        dateCreated: new Date(),
        dateCompleted: null,
        completed: false,
        timezoneOffset: (new Date).getTimezoneOffset()
      },
      success: function() {
        context.retrieve();
      },
      error: function(err) {
        console.log('POST request error: ', err)
      }
    });
  }

  deleteItem(item) {
    var context = this;
    $.ajax({
      method: 'DELETE',
      url: '/items',
      data: {
        description: item.description,
        dateCreated: item.dateCreated,
        timezoneOffset: item.timezoneOffset
      },
      success: function() {
        context.retrieve();
      },
      error: function(err) {
        console.log('DELETE request error: ', err);
      }
    });
  }

  markCompleted(item, completionState) {
    var context = this;
    $.ajax({
      method:'PUT',
      url: '/items',
      data: {
        description: item.description,
        dateCreated: item.dateCreated,
        dateCompleted: item.dateCompleted,
        completed: !completionState,
        deleted:false,
        timezoneOffset: item.timezoneOffset
      },
      success: function() {
        context.retrieve();
      },
      error: function(err) {
        console.log('PUT request error: ', err);
      }
    });
  }

  updateFilter(selection) {
    this.setState({
      filter: selection
    }, function() {
      this.retrieve();
    })
  }

  search(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    }, function() {
      this.retrieve();
    })
  }

  render () {
    return (
      <div>
        <h1>Todo List</h1>
        <h4>{this.state.todoItems.length} items in your todo list</h4>
        <div className = 'add-item-bar'>
          <AddItemBar addItem = {this.addItem}/>
        </div>
        <div className = 'app'>
          <div className = 'todo-items'>
            <List
              todoItems={this.state.todoItems}
              markCompleted = {this.markCompleted}
              deleteItem = {this.deleteItem}
              filter = {this.state.filter}
            />
          </div>
          <div className = 'side-bar'>
            <SearchBar search = {this.search}/>
            <FilterBar updateFilter = {this.updateFilter}/>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
