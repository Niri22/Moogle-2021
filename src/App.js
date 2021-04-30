import React from "react";
import "./App.css";
import Fuse from 'fuse.js'
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"

import filtersByObjectType from "./util/search_capabilities"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch"
import SearchBar from './SearchBar'
import DataList from './DataList'
import Divider from 'monday-ui-react-core'

const monday = mondaySdk();
let fuse = null;

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
    let searchResults = this.state.dataList
    if(searchString && searchString.length > 0) {
      searchResults = fuse.search(searchString).map(result => result.item)
    }
    const filtered = this.addAdvancedFilters(searchResults)
    this.setState({
      searchString: this.searchString,
      dataList: filtered
    });
 }

 addAdvancedFilters(searchResults) {
  return searchResults.filter(result => {
    let valid = true
    this.state.activeFilters.forEach(filter => {
      if(result.type === filter.type && result[filter.field] !== filter.value)
        valid = false
    })
    return valid
  })
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
          created_at
          updated_at
          column_values {
            title
            id
            type
            text
          }
        }
      }
      items {
        created_at
        updated_at
        board {
          name
        }
        updates {
          text_body
        }
        ${this.generateSearchableFieldsString('items')}
      }
      tags {
        ${this.generateSearchableFieldsString('tags')}
      }
      updates {
        creator {
          id
          name
        }
        replies {
          id
          text_body
        }
        ${this.generateSearchableFieldsString('updates')}
      }
      users {
        email
        phone
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
  }, () => {
    this.updateInput(this.state.searchString)
  })
}

render() {
  return <div className="App">
    <div class = "header">
      </div>
    
    <h2>
    <SearchBar
      input={this.searchString}
      onChange={this.updateInput.bind(this)}
    /><p><AdvancedSearch updateFilters={this.updateFilters.bind(this)}></AdvancedSearch></p>
    
    </h2>
    
    {/* <div class = "header">{JSON.stringify(this.state.dataList, null, 2)}</div> */}
    <div>
      <DataList dataList={this.state.dataList}/>
    </div>
    
  </div>;
}
}

export default App;
