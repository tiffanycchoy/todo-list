import React from 'react';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00a07b'
  }
})

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  handleClick() {
    var item = this.props.item;
    item.completed === true ? item.dateCompleted = '' : item.dateCompleted = Date.now();
    this.props.markCompleted(item, item.completed);
  }

  handleDelete() {
    this.props.deleteItem(this.props.item);
  }

  formatDate(date) {
    return moment(date, 'YYYY-MM-DD hh:mm:ss').format('llll');
  }

  render() {
    var item = this.props.item;
    var dateCreated = this.formatDate(item.dateCreated);
    var dateCompleted = this.formatDate(item.dateCompleted);
    var textDecor;

    dateCompleted === "Invalid date" ? dateCompleted = '' : dateCompleted = dateCompleted;

    this.props.filter === 'show_all' && item.completed || this.props.filter === 'show_completed'
      ? textDecor = 'strike-through'
      : textDecor = 'none';

    return (
      <MuiThemeProvider muiTheme = {muiTheme}>
        <tr>
          <td>
            <Checkbox checked = {item.completed} onCheck = {this.handleClick}/>
          </td>
          <td className = {textDecor}>{item.description}</td>
          <td className = {textDecor}>{item.category}</td>
          <td className = {textDecor}>{dateCreated}</td>
          <td className = {textDecor}>{dateCompleted}</td>
          <td>
            <span onClick = {this.handleDelete} className = "remove-item glyphicon glyphicon-trash" ></span>
          </td>
        </tr>
      </MuiThemeProvider>
    )
  }
}

export default ListItem;
