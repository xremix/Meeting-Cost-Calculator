import React from 'react';

interface ChipProps {
  label: string;
  value: number;
  onClick: (value: number) => void;
}

const Chip: React.FC<ChipProps> = ({ label, value, onClick }) => {
  return (
    <button
      type="button"
      className="chip"
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};

export default Chip; 