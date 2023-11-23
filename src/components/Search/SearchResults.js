import React from 'react'

const SearchResults = ({post}) => {
  return (
    <div className='search-result'>
        {post.title}
    </div>
  )
}

export default SearchResults