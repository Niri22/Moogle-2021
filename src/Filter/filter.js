import React from "react";
import "monday-ui-react-core/dist/main.css"
import "./FilterStyles.css"
import { Heading } from "monday-ui-react-core"

class FilterSelector extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      checked: false,
      name: "",
    };
  }

  componentDidMount() {
  }

  toggleFilter(event) {
      this.setState({
          checked: !this.state.checked
      })
      if(this.this.state.checked) {
        this.props.addSelectedFilter();
      }
      else {
        this.props.removeSelectedFilter();
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
      <Heading className={"filterTitle"} type="h4" value={this.toCapitalized(this.props.filterObject.title)} />
      {
        this.props.filterObject.type === 'dropdown' ?
          null :
          null
      }
    </div>
  }
}

export default FilterSelector;
