import React from "react";
import "./App.css";
import Fuse from 'fuse.js'
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import filtersByObjectType from "./util/search_capabilities"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch"
import SearchBar from './SearchBar'
import DataList from './DataList'

const monday = mondaySdk()
monday.setToken('add key here') // TODO: add key here!!

let fuse = null
class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      searchString: '',
      dataList : [],
      activeFilters: []
    };
  }

  async updateInput(searchString) {
     const searchResults = fuse.search(searchString)
     const filtered = this.addAdvancedFilters(searchResults)
     console.log('filtered: ', filtered)
     this.setState({
      searchString: this.searchString,
      dataList: filtered
    });
  }

  componentDidMount() {
    console.log('in componentDidMount')
    monday.listen("context", response => {
      this.setState({context: response.data});
      console.log('waiting to display data')
      console.log(response.data);
      monday.api(`query {
        boards {
          ${this.generateSearchableFieldsString('boards')}
          items {
            name
            column_values {
              title
            }
          }
        }
        items {
          ${this.generateSearchableFieldsString('items')}
        }
        tags {
          ${this.generateSearchableFieldsString('tags')}
        }
        updates {
          ${this.generateSearchableFieldsString('updates')}
        }
        users {
          ${this.generateSearchableFieldsString('users')}
        }
      }`).then(response => {
        // create fuse object to store all data that will be searchable later
        const dataTypes = Object.keys(response.data)
        const allTypedData = dataTypes.reduce((allData, type) => {
          const typedData = response.data[type].map(resultObj => {return {...resultObj, type: type}})
          return allData.concat(typedData)
        }, [])
        fuse = new Fuse(allTypedData, {
          keys: [
            'state', 
            'description', 
            'name', 
            'color', 
            'text_body', 
            'updated_at', 
            'email',
            'phone',
            'location',
            'title',
          ]
        })
        console.log('all data: ', allTypedData)
        this.setState({
          dataList: allTypedData,
        })
      })
    })
  }

  generateSearchableFieldsString(objectType) {
    return filtersByObjectType[objectType].searchableFields.reduce((endString, nextField) => {
      return endString + nextField + "\n"
    }, '')
  }

  updateFilters(updatedFilters) {
    this.setState({
      activeFilters: updatedFilters
    })
  }

  render() {
    return <div className="App">
      <h1>Moogle Search</h1>
      <SearchBar
        input={this.searchString}
        onChange={this.updateInput.bind(this)}
      />
      <AdvancedSearch updateFilters={this.updateFilters.bind(this)}></AdvancedSearch>
      {/* <p>{JSON.stringify(this.state.dataList, null, 2)}</p> */}
      <DataList dataList={this.state.dataList}/>
    </div>;
  }
}

export default App;
