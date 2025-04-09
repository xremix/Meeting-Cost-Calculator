import React, { useState } from 'react';
import './App.css';

function App() {
  const [salary, setSalary] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted salary:', salary);
    // We'll add more functionality here later
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meeting Cost Calculator</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="salary">Average Annual Salary (€): </label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Enter salary"
              min="0"
              max="1000"
            />
          </div>
          <button type="submit">Confirm</button>
        </form>
      </header>
    </div>
  );
}

export default App;
