import React from 'react';

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

export default DataList