import React from "react";
import "monday-ui-react-core/dist/main.css"
import Dropdown from "react-dropdown"
import { TextField } from 'monday-ui-react-core'
import "./FilterStyles.css"

class Filter extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      checked: false,
      filterValue: this.props.filterObject.type === 'date' ? [] : '',
      name: "",
    };
  }

  componentDidMount() {
  }

  async changeFilterValue(value) {
    if(this.state.checked) {
      await this.props.removeSelectedFilter(this.props.filterObject.field)
      // read with new value
      this.props.addSelectedFilter(this.props.filterObject.field, value)
    }
    this.setState({
      filterValue: value,
    })
  }

  async toggleFilter(event) {
      this.setState({
          checked: !this.state.checked
      })
      await this.props.removeSelectedFilter(this.props.filterObject.field)
      if(!this.state.checked) {
        this.props.addSelectedFilter(this.props.filterObject.field, this.state.filterValue)
      }
  }

  toCapitalized(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  render() {
    return <div
      className={"filter"}
    >
      <div className={"filterCheckbox"}>
        <input type="checkbox" 
          className={"checkbox"} 
          checked={this.state.checked} 
          onChange={this.toggleFilter.bind(this)}
        />
      </div>
      <h4 className={"filterTitle"}>{this.toCapitalized(this.props.filterObject.title)}</h4>
      {
        this.props.filterObject.type === 'dropdown' ?
          <Dropdown
          className="filterDropdown"
          disabled={!this.state.checked}
          options={this.props.filterObject.values}
          placeholder={"Select option"}
          onChange={value => this.changeFilterValue(value.value)}
          value={this.state.filterValue}
        /> : null
      }
      {
        this.props.filterObject.type === 'text' ?
          <TextField
            placeholder={'Type value here'}
            value={this.state.filterValue}
            onChange={value => this.changeFilterValue(value)}
          /> : null
      }
      {
        this.props.filterObject.type === 'date' ?
          <div>
            <TextField
              placeholder={'MM/DD/YYYY'}
              value={this.state.filterValue[0]}
              onChange={value => this.changeFilterValue([ value, this.state.filterValue[1] ])}
            />
            <p>to</p>
            <TextField
              placeholder={'MM/DD/YYYY'}
              value={this.state.filterValue[1]}
              onChange={value => this.changeFilterValue([ this.state.filterValue[0], value ])}
            />
          </div> : null
      }
    </div>
  }
}

export default Filter;
