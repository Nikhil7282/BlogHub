import React from 'react'
import SearchResults from './SearchResults'
const SearchList = ({results}) => {
  return (
    <div className='results-list'>
        {results.map((post,idx)=>{
            return <SearchResults post={post} key={idx}/>
        })}
    </div>
  )
}

export default SearchList