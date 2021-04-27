import React from 'react';

///Problem occurs when Nested List // 
// First I have a irregular nest List //

// let newList = []

// dataList.map(function mapper(OGlist) {
//       if (Array.isArray(OGlist)) {
//             return OGlist.map(mapper);
//       }
//       else {
//             return newList.push(OGlist);
//       }
// })

const DataList = ({dataList=[]}) => {
  return (
    <ul id="BoardList">
        {
          dataList.boards ?
            dataList.boards.map((nextElement) =>  
              <li class="BoardName">
                  <h1>{nextElement.name}</h1>
                  <h2>{nextElement.description}</h2>
                  <h2> Items: </h2>
                  <ul id = "Item List">
                    {nextElement.items ? 
                      nextElement.items.map((nextElement1) =>
                      <li class = "ItemName">
                        <p>{nextElement1.name}</p>
                        </li>
                        ) : null}
                  </ul>
                  
              </li>
          ) : null
        }
      </ul>
  )
}

{/* {dataList.map(function mapper(OGlist) {
      if (Array.isArray(OGlist)) {
            return OGlist.map(mapper);
      }
      else {
            return newList.push(OGlist);
      }
      })} */}

export default DataList