import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
import Search from "monday-ui-react-core/dist/Search";
import DialogContentContainer from "monday-ui-react-core";
import SearchPage from './Components/SearchPage.js';

const monday = mondaySdk();
const boardNamearr =[];

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
      boardData: {}, 
      initialItems : [],
      items: []
    };
    this.initalresults = [];
  }

  // fitlerList = (event) => {
  //   let items = this.state.initialItems;
  //   items = itmes.filter(item) => {
  //     return item.toLowerCase().search(event.target.value.toLowerCase)) !== -1:

  //   });
  //   this.setState({items: items});
  // }

  componentDidMount() {
    // monday.listen("settings", res => {
    //   this.setState({ settings: res.data });
    // });
    monday.listen("context", res => {
      this.setState({context: res.data});
      console.log(res.data);
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
      `,
        { variables: {boardName: this.state.context.boardName} }
      )
      .then(res => {
        this.setState({boardData: res.data});
      });
      
    })
  }

// First page string of data
loadCharacters = async () => {
  try {
      const res = this.state.boardData;
      this.initalresults = await res.json();
      // this.displayCharacters(this.hpCharacters);
      this.setState({
        initalresults : this.initalresults
      }) 
  } catch (err) {
      console.error(err);
    }
  };

// const charactersList = document.getElementById('charactersList');

// const displayResult = (result) => {
//   const htmlString = result
//     .map((result)  => {
//       return `
//       <li class = "result">
//         <h2>{result.name}</h2>
//       </li>
//       `;
//     })
//     .join('');
//     charactersList.innerHTML = htmlString;
// };
// const names = this.state.boards.map((nextElement) => nextElement.name);
// const names = this.state.boardData.boards.map((nextElement) => {nextElement.name});

  render() {
    return (
      <div
        className="App"
        style={{background: (this.state.settings.background)}}
        >
        <h2><Search
          id="searchBar"
          inputAriaLabel={"Search for content"}
          autoFocus={true}
          placeholder={"Search Bar"}
          debounceRate={200}
        /></h2>
  <p>{JSON.stringify(this.state.boardData.boards, null, 2)}</p>
  <ul id="BoardList">
        {
          this.state.boardData.boards ?
            this.state.boardData.boards.map((nextElement) =>  
              <li class="BoardName">
                  <h1>{nextElement.name}</h1>
                  <ul id="BoardListItemList">
                    {
                      this.state.boardData.boards.items ?
                        this .state.boardData.boards.items.map((nextElement) => 
                          <li class = "ItemName">
                            <h2>{nextElement.name}</h2>
                          </li>
                        ) : null
                        }
                  </ul>
              </li>
          ) : null
        }
      </ul>
    
      </div>
    );
  }
}

export default App;
