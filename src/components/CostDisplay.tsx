import React from 'react';

interface CostDisplayProps {
  cost: number | null;
}

const CostDisplay: React.FC<CostDisplayProps> = ({ cost }) => {
  if (cost === null) return null;

  return (
    <div className="cost-display">
      <h2>Meeting Cost</h2>
      <div className="cost-amount">€{cost.toFixed(2)}</div>
    </div>
  );
};

export default CostDisplay; 