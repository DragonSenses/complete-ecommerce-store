import React from 'react';

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
});

const Currency = () => {
  return (
    <div className="font-semibold">
      Currency
    </div>
  )
}

export default Currency