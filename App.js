import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js"
import Search from "monday-ui-react-core/dist/Search"
import DialogContentContainer from "monday-ui-react-core"

const monday = mondaySdk();
const boardNamearr =[];

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
      boardData: {}
    };
    this.initalresults = [];
  }

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
        characters : this.initalresults
      }) 
  } catch (err) {
      console.error(err);
    }
  };

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
  <p>{JSON.stringify(this.state.boardData, null, 2)}</p>
  <ul id="BoardList">
        {
          this.state.boardData.boards ?
            this.state.boardData.boards.map((nextElement) =>  
              <li class="BoardName">
                  <DialogContentContainer id="Knobs" className="dialog-content-container-story">
                  <h1>{nextElement.name}</h1>
                  </DialogContentContainer>
                  <h1>{nextElement.name}</h1>
                  {/* <p>{nextElement.description}</p> */}
              </li>
          ) : null
        }
      </ul>
    
      </div>
    );
  }
}

export default App;
