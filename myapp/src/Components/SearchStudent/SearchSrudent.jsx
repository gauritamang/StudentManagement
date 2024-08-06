import React, { useState } from 'react'

function SearchSrudent() {
    const [searchState,setSearchState]=useState('')
    console.log("you are searching ",searchState)
  return (
    <div>
      <input type="search" className='form-control mb-4' placeholder='search' onChange={(e)=>setSearchState(e.target.value)} />
    </div>
  )
}

export default SearchSrudent