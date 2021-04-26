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
    <>
    {dataList.Boards ? dataList.Boards.map((data,index) => {
        if (data) {
          return (
            <div key={data.Boards}>
              <h1>{data.Boards.name}</h1>
              <h1>{data.Boards.description}</h1>
              <h1>{data.Boards.items}</h1>
	    </div>
          	
    	   )
    	 }
    	 return null
    }) : null }
    </>
  );
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