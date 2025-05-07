import React from "react";

const FilterSidebar = () => {
  return (
    <>
    <div className="w-72 h-[70vh] border-1 border-gray-300 m-4 px-4 py-6 overflow-y-auto bg-white rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Apply filter</h2>
        <button className="text-sm text-gray-500 hover:text-red-500">Clear all</button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Stores in your area</h3>
        <div className="space-y-2">
          {["Inventory", "HT tech", "AIMaidah", "Your Pharmacy"].map((store) => (
            <label key={store} className="flex items-center text-sm text-gray-800">
              <input type="checkbox" className="mr-2 accent-red-500" />
              {store}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {[
            "SMARTPHONE",
            "DESKTOP PC",
            "BAREBONE",
            "GAMING CASING",
            "FAN KIT",
            "CPU COOLER",
            "HEADPHONE",
            "FAN"
          ].map((category) => (
            <label key={category} className="flex items-center text-sm text-gray-800">
              <input type="checkbox" className="mr-2 accent-red-500" />
              {category}
            </label>
          ))}
          
        </div>
      </div>
    </div>

</> 
  );
};

export default FilterSidebar;
