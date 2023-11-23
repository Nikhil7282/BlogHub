import React, { useContext, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { postContext } from '../../context/globalContext'

const SearchBar = () => {
    const {state}=useContext(postContext)
    const [results,setResults]=useState([])
    // console.log(state);
    const handleChange=(e)=>{
        const filteredPost=state.data.filter((post)=>{
            return e.target.value && post.title.toLowerCase().includes(e.target.value)
        })
        setResults(filteredPost)
        console.log(results);
    }
    const handleClick=()=>{

    }
  return (
    <div className='searchBar'>
        <input type="text" placeholder="Search" onChange={handleChange}/>
        <button onClick={handleClick}><IoSearch/></button>
    </div>
  )
}

export default SearchBar