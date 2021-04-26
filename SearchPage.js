import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import DataList from './DataList';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [dataListDefault, setDataListDefault] = useState();
  const [dataList, setDataList] = useState();

  const fetchData = async () => {
    return await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
         setDataList(data) 
         setDataListDefault(data)
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
      <h1>Data List</h1>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <DataList dataList={dataList}/>
    </>
   );
}

export default SearchPage