import React from "react";
import "./App.css";
// import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css"
//Explore more Monday React Components here: https://style.monday.com/
import {Search} from "monday-ui-react-core"
import AdvancedSearch from "./AdvancedSearch/AdvancedSearch"

// const monday = mondaySdk();

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
  }

  render() {
    return <div className="App">
      <Search
        inputAriaLabel={"Search bar"}
        autoFocus={true}
        placeholder={"Search here"}
        iconName={"fa-search"}
      />
      <AdvancedSearch></AdvancedSearch>
    </div>;
  }
}

export default App;
