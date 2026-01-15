import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Gigs from '../components/Gigs';

const Home = () => {
  const [isSearchbar,setIsSearchBar]=useState(false);
  return (
    <div>
        <Navbar setIsSearchBar={setIsSearchBar}/>
        <Gigs isSearchBar={isSearchbar} onDashboard={false}/>
    </div>
  )
}

export default Home