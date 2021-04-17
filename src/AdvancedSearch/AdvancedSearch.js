import React from "react";
import "monday-ui-react-core/dist/main.css"
import { Button, Menu } from "monday-ui-react-core"
import {Collapse} from 'react-collapse';
import filtersByObjectType from "../util/search_capabilities"
import ObjectFilters from "./ObjectFilters";


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

  render() {
    return <div className="AdvancedSearch">
      <Button onClick={this.toggleFiltersOpen.bind(this)}>
        Advanced Search
      </Button>
      <Collapse isOpened={this.state.filtersOpen}>
        <Menu>
          {
            this.objectTypes.map(objectType => 
             <ObjectFilters filterObject={objectType} />
          )}
        </Menu>
      </Collapse>
    </div>;
  }
}
