import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  label: {
    fontFamily:'Montserrat'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00a07b'
  }
});

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.updateFilter(event.target.value);
  }

  render() {
    return (
      <div>
        <div className = "top-margin"></div>
        <MuiThemeProvider muiTheme = {muiTheme}>
          <RadioButtonGroup name="shipSpeed" defaultSelected="show_all" onChange = {this.handleChange}>
            <RadioButton
              value="show_all"
              label="Show All"
              labelStyle = {styles.label}
              className = "radio-bottom-margin"
            />
            <RadioButton
              value="show_completed"
              label="Show Completed"
              labelStyle = {styles.label}
              className = "radio-bottom-margin"
            />
            <RadioButton
              value="show_not_completed"
              label="Show Not Completed"
              labelStyle = {styles.label}
              className = "radio-bottom-margin"
            />
          </RadioButtonGroup>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default FilterBar;
