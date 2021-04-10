import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import Search from "monday-ui-react-core/dist/Search"
import Dropdown from "monday-ui-react-core/dist/Dropdown";
import DialogContentContainer from "monday-ui-react-core/dist/DialogContentContainer"

const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      characters : []
    };
    this.hpCharacters = [];
  }

  componentDidMount() {
    this.loadCharacters();
  }

loadCharacters = async () => {
try {
    const res = await fetch('https://hp-api.herokuapp.com/api/characters');
    this.hpCharacters = await res.json();
    // this.displayCharacters(this.hpCharacters);
    this.setState({
      characters : this.hpCharacters
    }) 
} catch (err) {
    console.error(err);
  }
};

  keyUpHandler(value) {
    const searchString = value.toLowerCase();

    const filteredCharacters = this.hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString) ||
           character.actor.toLowerCase().includes(searchString)
        );
    });
    this.setState({
      characters : filteredCharacters
    })
    // displayCharacters(filteredCharacters);
  }

  render() {
    // const mockColorOptions = [
    //   { value: "Search in Boards", label: "Search in Boards", isFixed: true },
    //   { value: "Search in Tasks", label: "Search in Tasks", isFixed: true },
    //   { value: "Search in Comments", label: "Search in Comments", isFixed: true},
    //   { value: "Search in Teams", label: "Search in Teams", isFixed: true},
    //   { value: "Search in Everything", label: "Search in Everything", isFixed: true },
    //   ];
    return <div className="App">

    <div style={{ width: "100%", margin: "10 auto" }}>
    
      <h1>&#x2728;Moogle &#x2728;</h1>
        
      <Search
        id="searchBar"
        inputAriaLabel={"Search for content"}
        autoFocus={true}
        placeholder={"Search Bar"}
        debounceRate={200}
        onChange={value => this.keyUpHandler(value)}
        value={""}
        iconName={"fa-search"}
        secondaryIconName={"fa-circle"}
        validation={{
          None: null,
          Error: { status: "error" },
          Success: { status: "success" }
        }}
        clearOnIconClick={true}
        disabled={false}
        size={Search.sizes.MEDIUM}
      />
      <ul id="charactersList">
        {
          this.state.characters
          .map((character) =>  
              <li class="character">
                  <h2>{character.name}</h2>
                  <p>House: {character.house}</p>
                  <img src={character.image}></img>
              </li>
          )
        }
      </ul>
      
  </div>

  </div>;
  }
}

export default App;
