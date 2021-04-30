import React from 'react';import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import DialogContentContainer from "monday-ui-react-core";
import AttentionBox from "monday-ui-react-core";
import Divider from "monday-ui-react-core/dist/Divider";

function getResult(searchResult) {
  // console.log('result and type: ', searchResult, searchResult.type)
  if(searchResult.type === "boards") {
    return (
      <div id = "rcornersboard">
        <div class="dropdown">
            <h2 class = 'ResultHeading'>Board: {searchResult.name}</h2>
            <h3 class = 'dropdown-content'> <h4>Description: </h4>{searchResult.description} <h4>Items in the board:</h4>
              <ul id = "Item List">
                    {searchResult.items ? 
                      searchResult.items.map((item) =>
                      <li class = "ItemName">
                        <p>{item.name}</p>
                        </li>
                        ) : null}
                  </ul>
              </h3>
            <div style={{ width: 1200, height: 10 }}>
            <Divider id="divider" direction={Divider.directions.HORIZONTAL} />
            </div>
        </div>
      </div>
    );
  }
  else if(searchResult.type === "items") {
    return (
      <div id = "rcornersitem">
            <li class="dropdown">
                <h2 class = 'ResultHeading'>Items: {searchResult.name}</h2>
                <h3 class = 'dropdown-content'>
                <h4>Board: </h4>{searchResult.board.name}
                <h4>Update(s): </h4>
                <ul id = "Update List">
                  {searchResult.updates ? 
                        searchResult.updates.map((update) =>
                        <li class = "ItemName">
                          <p>{update.text_body}</p>
                          </li>
                          ) : null}
                </ul>
                <h4>Created at: </h4>{searchResult.created_at} 
                <h4>Updated at: </h4>{searchResult.updated_at}</h3>
                <div style={{ width: 1200, height: 10 }}>
                <Divider id="divider" direction={Divider.directions.HORIZONTAL} />
                </div>
            </li>
          </div>
    );
  }
  else if(searchResult.type === "updates") {
    return (
      <div id = "rcornersupdates">
            <li class="dropdown">
                <h2 class = 'ResultHeading'>Updates: {searchResult.text_body}</h2>
                <h3 class = 'dropdown-content'>
                <h4>Replies: </h4>
                <ul id = "Replies List">
                  {searchResult.replies ? 
                        searchResult.replies.map((reply) =>
                        <li class = "ItemName">
                          <p>{reply.text_body}</p>
                          </li>
                          ) : null}
                </ul>
                <h4>Creator: </h4>{searchResult.creator.name}
                <h4>Created at:</h4>{searchResult.created_at} 
                <h4>Updated at:</h4>{searchResult.updated_at}</h3>
                <div style={{ width: 1200, height: 10 }}>
                <Divider id="divider" direction={Divider.directions.HORIZONTAL} />
                </div>
            </li>
          </div>
    )

  }
  else if(searchResult.type === "tags") {
    return (
      <div id = "rcornerstags">
            <li class="dropdown">
                <h2 class = 'ResultHeading'>Tags: {searchResult.name}</h2>
                {/* <h3 class = 'dropdown-content'> Description: {searchResult.description}</h3> */}
                <div style={{ width: 1200, height: 10 }}>
                <Divider id="divider" direction={Divider.directions.HORIZONTAL} />
                </div>
            </li>
          </div>
    );
  }
  else {
    return (
      <div id = "rcornersusers">
            <li class="dropdown">
                <h2 class = 'ResultHeading'>Users: {searchResult.name}</h2>
                <h3 class = 'dropdown-content'><h4>Email: </h4>{searchResult.email} <h4>Phone: </h4>{searchResult.phone}</h3>
                <div style={{ width: 1200, height: 10 }}>
                <Divider id="divider" direction={Divider.directions.HORIZONTAL} />
                </div>
            </li>
          </div>
    );
  }
}

const DataList = (props) => {
  return (
    props.dataList ?
    props.dataList.map(searchResult =>
      getResult(searchResult)
    ) : null
  )
}

export default DataList
    