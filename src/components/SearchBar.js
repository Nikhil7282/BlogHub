import React, { useState } from 'react'

function SearchBar({posts}) {
    const [input,setInput]=useState("")
    // console.log(posts);
    const findMatches=()=>{
        if(input ===""){
            return []
        }
        return posts.filter(post=>{
            const regex=new RegExp(input,'gi')
            // console.log(post.title.match(regex));
            return post.title.match(regex)
        })
    }   

    const displayMatches=()=>{
        return findMatches().map((post)=>{
            return (
                <li>
                    <span className='name'>{post.title}</span>
                    <span className='population'>{post.description}</span>
                </li>
            )
        })
    }
    // console.log(posts);
  return (
    <div>
        <form className='search-form'>
            <input type='text' className="search" placeholder='Post Title' onChange={(e)=>setInput(e.target.value)}/>
            <ul className='suggestions'>
                {displayMatches()}
            </ul>
        </form>
    </div>
  )
}

export default SearchBar