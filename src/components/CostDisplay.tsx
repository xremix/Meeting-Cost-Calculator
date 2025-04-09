import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';

interface CostDisplayProps {
  cost: number | null;
}

const CostDisplay: React.FC<CostDisplayProps> = ({ cost }) => {
  const previousCost = useRef<number>(0);

  useEffect(() => {
    if (cost !== null) {
      previousCost.current = cost;
    }
  }, [cost]);

  if (cost === null) return null;

  return (
    <div className="cost-display">
      <h2>Meeting Cost</h2>
      <div className="cost-amount">
        <span>€</span>
        <CountUp start={previousCost.current} end={cost} decimals={2} duration={1} />
      </div>
    </div>
  );
};

export default CostDisplay; 