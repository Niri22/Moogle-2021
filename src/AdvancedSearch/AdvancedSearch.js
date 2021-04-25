import React from "react";
import "monday-ui-react-core/dist/main.css"
import { Button, Menu } from "monday-ui-react-core"
import {Collapse} from 'react-collapse';

import "./advancedSearch.css"
import filtersByObjectType from "../util/search_capabilities"
import ObjectFilters from "./objectFilters";
export default class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      activeFilters: [],
      filtersOpen: false,
    };
    this.objectTypes = Object.keys(filtersByObjectType)
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

  async addSelectedFilter(objectType, field, value) {
    const updatedFilters = [...this.state.activeFilters, {type: objectType, field: field, value: value}]
    this.props.regenerateQuery(updatedFilters)
    console.log(updatedFilters)
    this.setState({
      activeFilters: updatedFilters
    })
    
  }

  async removeSelectedFilter(objectType, field) {
    const updatedFilters = this.state.activeFilters.filter(filterObj => {
      console.log('filtering filter: ', filterObj)
      return !filterObj.type === objectType || !filterObj.field === field
    })
    console.log(updatedFilters)
    this.setState({
      activeFilters: updatedFilters
    })
    this.props.regenerateQuery(updatedFilters)
  }

  render() {
    return <div className="AdvancedSearch">
      <Button onClick={this.toggleFiltersOpen.bind(this)}>
        Advanced Search
      </Button>
      <Collapse isOpened={this.state.filtersOpen}>
        <Menu>
          {
            this.objectTypes.map(objectType => 
             <ObjectFilters filterObject={objectType} 
              removeSelectedFilter={this.removeSelectedFilter.bind(this)} 
              addSelectedFilter={this.addSelectedFilter.bind(this)}
            />
          )}
        </Menu>
      </Collapse>
    </div>;
  }
}
