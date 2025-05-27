import React, { useState } from "react";
import FilterSidebar from "./filtersidebar";

const ResponsiveFilterSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      {/* Button for mobile */}
      <div className="md:hidden p-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowSidebar(true)}>
          Show Filters
        </button>   
      </div>

      {/* Sidebar Overlay for mobile */}
      {showSidebar && (
        <div className="fixed inset-0 z-50  bg-opacity-50 flex">
          <div className=" bg-white shadow-lg h-full">
            <div className="flex justify-end p-4">
              <button
                className="text-gray-700 font-bold text-xl"
                onClick={() => setShowSidebar(false)}
              >
                ×
              </button>
            </div>
            <FilterSidebar />
          </div>
          {/* Close area */}
          <div
            className="flex-1"
            onClick={() => setShowSidebar(false)}
          ></div>
        </div>
      )}

      {/* Normal sidebar on desktop */}
      <div className="hidden md:block">
        <FilterSidebar />
      </div>
    </>
  );
};

export default ResponsiveFilterSidebar;