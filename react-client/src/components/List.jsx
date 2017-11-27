import React from 'react';
import ListItem from './ListItem.jsx';
import {sort} from '../helperFunctions.js';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedArr: this.props.todoItems
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(clickedHeader) {
    var sorted = sort(this.props.todoItems, clickedHeader);
    this.setState({
      sortedArr: sorted
    })
  }

  render() {
    var context = this;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th onClick = {function(){context.handleClick('description')}}>
                Task Description <span className = "glyphicon glyphicon-menu-down"></span>
              </th>
              <th onClick = {function(){context.handleClick('category')}}>
                Category <span className = "glyphicon glyphicon-menu-down"></span>
              </th>
              <th onClick = {function(){context.handleClick('dateCreated')}}>
                Date Created <span className = "glyphicon glyphicon-menu-down"></span>
              </th>
              <th onClick = {function(){context.handleClick('dateCompleted')}}>
                Date Completed <span className = "glyphicon glyphicon-menu-down"></span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.todoItems.map((item, index) =>
              <ListItem
                key = {index}
                item = {item}
                markCompleted = {this.props.markCompleted}
                deleteItem = {this.props.deleteItem}
                filter = {this.props.filter}
              />
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default List;
