import React from 'react';

interface SalaryInputProps {
  salary: string;
  onSalaryChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  showToggle?: boolean;
  onToggle?: () => void;
  isVisible: boolean;
}

const SalaryInput: React.FC<SalaryInputProps> = ({
  salary,
  onSalaryChange,
  onSubmit,
  showToggle,
  onToggle,
  isVisible
}) => {
  return (
    <div className="salary-section">
      {showToggle && (
        <button 
          className="toggle-button"
          onClick={onToggle}
        >
          {isVisible ? 'Hide' : 'Change'} Hourly Rate
        </button>
      )}
      {isVisible && (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="salary">Average Hourly Rate (€): </label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => onSalaryChange(e.target.value)}
              placeholder="Enter hourly rate"
              min="0"
              step="0.01"
              required
            />
          </div>
          <button type="submit">Confirm</button>
        </form>
      )}
    </div>
  );
};

export default SalaryInput; 