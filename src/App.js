import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import filtersByObjectType from "./util/search_capabilities"
import {Search} from "monday-ui-react-core"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch"
import DataList from './DataList'

const monday = mondaySdk()
const startingQuery = '{boards(limit:5) { name description items} }'
class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      searchString: '',
      dataListDefault: {}, 
      dataList : {},
      queryString: ''
    };
  }

  async fetchInitialData() {
    return await fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEwNjAyNDQwMCwidWlkIjoyMTEyNDk5MCwiaWFkIjoiMjAyMS0wNC0xMFQwMTozMDo1NC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODU5MjkzMCwicmduIjoidXNlMSJ9.jhcnlnnIzbqiOYNSUv12XUu0DDQQ4lATbhQ9P5E4eYA'
      },
      body: JSON.stringify({
        'query' : startingQuery
      })
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        dataList: response.data,
        dataListDefault: response.data
      });
    });
  }

  async updateInput(searchString) {
     const filtered = this.dataListDefault.filter(data => {
      return data.name.toLowerCase().includes(searchString.toLowerCase())
     })
     this.setState({
      searchString: this.searchString,
      dataList: filtered
    });
  }

  componentDidMount() {
    this.fetchInitialData();
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
      <h1>Moogle Search</h1>
      <Search
        className="searchBar"
        inputAriaLabel={"Search bar"}
        autoFocus={true}
        placeholder={"Type your search here"}
        iconName={"fa-search"}
        value={this.searchString}
        onChange={this.updateInput}
      />
      <AdvancedSearch regenerateQuery={this.regenerateQuery.bind(this)}></AdvancedSearch>
      <DataList dataList={this.dataList}/>
    </div>;
  }
}

export default App;
