import React from 'react';

const ProductCard = ({ name, price }) => {
  return (
    <div className="bg-white  p-4 rounded-md text-center w-48 border-1 border-gray-300">
      <div className=" h-24 bg-black  mb-2 overflow-hidden ">
        <img src="./women.jpg" alt="" />
      </div>
      <div className="flex items-center justify-start text-sm font-semibold">{name}</div>
      <div className="flex items-center justify-start text-red-500 font-bold">Rs.{price}</div>
    </div>
  );
};

export default ProductCard;
