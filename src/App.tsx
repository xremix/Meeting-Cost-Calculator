import React, { useState } from 'react';
import './App.css';

function App() {
  const [salary, setSalary] = useState<string>('');
  const [showSalaryInput, setShowSalaryInput] = useState(true);
  const [participants, setParticipants] = useState<string>('');
  const [meetingTime, setMeetingTime] = useState<string>('');
  const [meetingCost, setMeetingCost] = useState<number | null>(null);

  const handleSalarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (salary) {
      setShowSalaryInput(false);
    }
  };

  const calculateMeetingCost = () => {
    const hourlyRate = parseFloat(salary);
    const numParticipants = parseInt(participants);
    const durationInHours = parseInt(meetingTime) / 60;
    
    const cost = hourlyRate * numParticipants * durationInHours;
    setMeetingCost(cost);
  };

  const handleMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateMeetingCost();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meeting Cost Calculator</h1>
        {showSalaryInput ? (
          <form onSubmit={handleSalarySubmit}>
            <div>
              <label htmlFor="salary">Average Hourly Rate (€): </label>
              <input
                type="number"
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter hourly rate"
                min="0"
                step="0.01"
                required
              />
            </div>
            <button type="submit">Confirm</button>
          </form>
        ) : (
          <div className="calculator-container">
            <form onSubmit={handleMeetingSubmit}>
              <div>
                <label htmlFor="participants">Number of Participants: </label>
                <input
                  type="number"
                  id="participants"
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  placeholder="Enter number of participants"
                  min="1"
                  required
                />
              </div>
              <div>
                <label htmlFor="meetingTime">Meeting Duration (minutes): </label>
                <input
                  type="number"
                  id="meetingTime"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  placeholder="Enter meeting duration"
                  min="1"
                  required
                />
              </div>
              <button type="submit">Calculate Cost</button>
            </form>
            {meetingCost !== null && (
              <div className="cost-display">
                <h2>Meeting Cost</h2>
                <div className="cost-amount">€{meetingCost.toFixed(2)}</div>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
