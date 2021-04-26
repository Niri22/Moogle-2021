import React, { useState, useEffect } from 'react';
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

// class App1 extends React.Component {
//   constructor(props) {
//     super(props);

//     // Default state
//     this.state = {
//       initialItems : [],
//       items: []
//     };
//     this.initalresults = [];
//   }

//   componentDidMount() {
//     // monday.listen("settings", res => {
//     //   this.setState({ settings: res.data });
//     // });
//     monday.listen("context", res => {
//       this.setState({context: res.data});
//       console.log(res.data);
//       monday.api(`query {
//         boards {
//           name
//           description
//           items {
//             name
//             column_values {
//               title
//             }
//           }
//         }
//       }
//       `
//       )
//       .then(res => {
//         this.setState({initialItems: res.data});
//       });
      
//     })
//   }
// }

const App = (props) => {
  const [input, setInput] = useState('');
  const [dataListDefault, setDataListDefault] = useState();
  const [dataList, setDataList] = useState();

  let query = '{boards { name description items} }';

  const fetchData = async () => {
    return await fetch("https://api.monday.com/v2", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjEwNjAyNDQwMCwidWlkIjoyMTEyNDk5MCwiaWFkIjoiMjAyMS0wNC0xMFQwMTozMDo1NC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODU5MjkzMCwicmduIjoidXNlMSJ9.jhcnlnnIzbqiOYNSUv12XUu0DDQQ4lATbhQ9P5E4eYA'
        },
        body: JSON.stringify({
          'query' : query
        })
      })
      .then(response => response.json())
      .then(response => {
        this.setState({DataList: response.data}, {DataListDefault: response.data});
        //  setDataList(data) 
        //  setDataListDefault(data)
       });}

  const updateInput = async (input) => {
     const filtered = dataListDefault.filter(data => {
      return data.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setDataList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <h1>Search Bar</h1>
      <h2>Use this app to search for items accross different boards!</h2>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <DataList dataList={dataList}/>
    </>
   );
}

export default App;