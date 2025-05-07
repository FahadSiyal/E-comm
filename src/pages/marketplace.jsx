import React from 'react'
import FilterSidebar from '../components/filtersidebar'
import SearchBar from '../components/searchbar'
import StoreSection from '../components/storesection'
import ResponsiveFilterSidebar from '../components/responsivefiltersidebar'


function marketPlace() {
  return (
    <div className="flex bg-white ">
    <ResponsiveFilterSidebar/>
    {/* <FilterSidebar/> */}
    <div className="flex-1 p-4">
      <SearchBar />
      <StoreSection />
    </div>
  </div>
  )
}

export default marketPlace