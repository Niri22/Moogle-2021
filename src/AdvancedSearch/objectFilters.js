import React from "react";
import "monday-ui-react-core/dist/main.css"
import { MenuItem, Menu } from "monday-ui-react-core"

import filtersByObjectType from "../util/search_capabilities"
import Filter from "../Filter/filter"

export default class ObjectFilters extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      activeFilters: [],
      filtersOpen: false,
    };
    this.objectType = props.filterObject
    this.filters = filtersByObjectType[this.objectType].filters
  }

  componentDidMount() {
    // TODO: set up event listeners
  }

  toggleFiltersOpen(event) {
    this.setState({
      filtersOpen: !this.state.filtersOpen
    })
  }

  toCapitalized(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  async addSelectedFilter(title, value) {
    await this.props.addSelectedFilter(this.objectType, title, value)
  }

  async removeSelectedFilter(field) {
    await this.props.removeSelectedFilter(this.objectType, field)
  }

  render() {
    return <div className="ObjectFilters">
      <MenuItem
          title={this.toCapitalized(this.objectType)}
          selected={false}
          onClick={this.toggleFiltersOpen.bind(this)}
      >
        <Menu isSubMenu={true} size={Menu.sizes.MEDIUM}>
          {this.filters.map(filterObject =>
            <Filter filterObject={filterObject} 
              addSelectedFilter={this.addSelectedFilter.bind(this)} 
              removeSelectedFilter={this.removeSelectedFilter.bind(this)}
            />
          )}
        </Menu>
      </MenuItem>
    </div>;
  }
}
