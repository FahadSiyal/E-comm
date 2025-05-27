import React from 'react';
import Card from './productcard'

const stores = [
  {
    name: 'Inventory',
    products: [
      { name: 'Panadol', price: 500 },
      { name: 'Samsung Galaxy S3', price: 20000 },
      { name: 'Normal PSU', price: 1000 },
      { name: 'THINKVISION 24', price: 12000 },
    ],
  },
  {
    name: 'HT tech',
    products: [
      { name: 'LCD 17 INCH', price: 4000 },
      { name: 'DELL DT 3010', price: 7500 },
      { name: 'DELL 22 INCH LED', price: 6500 },
      { name: '1 TB HDD', price: 6300 },
    ],
  },
];

const StoreSection = () => {
  return (
    <div>
      {stores.map(store => (
        <div key={store.name} className="mb-8">
          <h2 className="text-xl font-bold mb-2">{store.name}</h2>
          <div className="flex gap-4 flex-wrap ">
            {store.products.map(product => (
              <Card
                key={product.name}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreSection;
