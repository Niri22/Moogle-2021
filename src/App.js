import React from "react";
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import filtersByObjectType from "./util/search_capabilities"
import {Search} from "monday-ui-react-core"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch"

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      queryString: ''
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
  }

  generateFilterString(objectType, filters) {
    return filters.filter(filter => filter.type === objectType).reduce((endString, nextFilter) => {
      return endString + nextFilter.title + ': ' + nextFilter.value + ', '
    }, '')
  }

  generateSearchableFieldsString(objectType) {
    return filtersByObjectType[objectType].searchableFields.reduce((endString, nextField) => {
      return endString + nextField + "\n"
    }, '')
  }

  regenerateQuery(activeFilters) {
    const newQuery = `{
      boards (${this.generateFilterString('boards', activeFilters)}) {
        ${this.generateSearchableFieldsString('boards')}
      }
      items (${this.generateFilterString('items', activeFilters)}) {
        ${this.generateSearchableFieldsString('items')}
      }
      tags (${this.generateFilterString('tags', activeFilters)}) {
        ${this.generateSearchableFieldsString('tags')}
      }
      updates (${this.generateFilterString('updates', activeFilters)}) {
        ${this.generateSearchableFieldsString('updates')}
      }
      users (${this.generateFilterString('users', activeFilters)}){
        ${this.generateSearchableFieldsString('users')}
      }
    }`
    this.setState({
      queryString: newQuery,
    })
  }

  render() {
    return <div className="App">
      <Search
        className="searchBar"
        inputAriaLabel={"Search bar"}
        autoFocus={true}
        placeholder={"Search here"}
        iconName={"fa-search"}
      />
      <AdvancedSearch regenerateQuery={this.regenerateQuery.bind(this)}></AdvancedSearch>
    </div>;
  }
}

export default App;
