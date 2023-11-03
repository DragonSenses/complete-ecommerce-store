import React from 'react';

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD'
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({
  value
}) => {
  return (
    <div className="font-semibold">
      {priceFormatter.format(Number(value))}
    </div>
  )
}

export default Currency