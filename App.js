import React from 'react';
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
import Search from "monday-ui-react-core/dist/Search";
import DialogContentContainer from "monday-ui-react-core";

import SearchBar from './SearchBar';
import DataList from './DataList';

const monday = mondaySdk();
// let query = '{boards(limit:3) { name id description items { name column_values{title id type text } } } }';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      input: '',
      dataListDefault: {}, 
      dataList : {},
    };
    
  }
  

  // async fetchData() {
  //   return await fetch("https://api.monday.com/v2", {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEwNjAyNDQwMCwidWlkIjoyMTEyNDk5MCwiaWFkIjoiMjAyMS0wNC0xMFQwMTozMDo1NC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODU5MjkzMCwicmduIjoidXNlMSJ9.jhcnlnnIzbqiOYNSUv12XUu0DDQQ4lATbhQ9P5E4eYA'
  //       },
  //       body: JSON.stringify({
  //         'query' : query
  //       })
  //     })
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({DataList: response.data});
  //       this.setState({dataListDefault: response.data});

  //       //  setDataList(data) 
  //       //  setDataListDefault(data)
  //      });}

  async updateInput(input) {
     const filtered = this.dataListDefault.filter(data => {
      return data.name.toLowerCase().includes(input.toLowerCase())
     })
     this.setState({input: this.input});
     this.setState({DataList: filtered});
    //  setInput(input);
    //  setDataList(filtered);
  }

  componentDidMount() {
    // this.fetchData();
    /////
    monday.listen("context", response => {
      this.setState({context: response.data});
      console.log(response.data);
      monday.api(`query {
        boards {
          name
          description
          items {
            name
            column_values {
              title
            }
          }
        }
      }
      `
      )
      .then(response => {
        this.setState({dataList: response.data});
        this.setState({dataListDefault: response.data});
      });
      
    })
      
  }

  render() {
    return (
      <>
        <h1>Search Bar</h1>
        <h2>Use th app to search for items accross different boards!</h2>
        <SearchBar 
        input={this.input} 
        onChange={this.updateInput}
        />
        {/* <p>{JSON.stringify(this.state.dataList, null, 2)}</p> */}
        <DataList dataList={this.dataList}/>
      </>
    );
  }
    
}

export default App;