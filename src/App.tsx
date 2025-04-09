import React, { useState, useEffect } from 'react';
import './App.css';
import SalaryInput from './components/SalaryInput';
import MeetingDetails from './components/MeetingDetails';
import CostDisplay from './components/CostDisplay';
import { getSalary, saveSalary } from './services/storageService';

function App() {
  const [salary, setSalary] = useState<string>(() => {
    // Initialize salary from storage service
    return getSalary();
  });
  const [showSalaryInput, setShowSalaryInput] = useState(true);
  const [participants, setParticipants] = useState<string>('2');
  const [meetingTime, setMeetingTime] = useState<string>('60');
  const [meetingCost, setMeetingCost] = useState<number | null>(null);
  const [step, setStep] = useState<number>(1);

  // Check if there's a saved salary on component mount
  useEffect(() => {
    const savedSalary = getSalary();
    if (savedSalary) {
      setSalary(savedSalary);
      setShowSalaryInput(false);
      setStep(2);
    }
  }, []);

  const handleSalarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (salary) {
      // Save salary using storage service
      saveSalary(salary);
      setShowSalaryInput(false);
      setStep(2);
    }
  };

  const toggleSalaryInput = () => {
    setShowSalaryInput(!showSalaryInput);
    // If toggling to show the input, make sure we're using the saved value
    if (!showSalaryInput) {
      const savedSalary = getSalary();
      if (savedSalary) {
        setSalary(savedSalary);
      }
    }
  };

  const calculateMeetingCost = () => {
    if (salary && participants && meetingTime) {
      const hourlyRate = parseFloat(salary);
      const numParticipants = parseInt(participants);
      const durationInHours = parseInt(meetingTime) / 60;
      
      const cost = hourlyRate * numParticipants * durationInHours;
      setMeetingCost(cost);
    }
  };

  useEffect(() => {
    calculateMeetingCost();
  }, [salary, participants, meetingTime]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meeting Cost Calculator</h1>
        <div className="calculator-container">
          <SalaryInput
            salary={salary}
            onSalaryChange={setSalary}
            onSubmit={handleSalarySubmit}
            showToggle={step === 2}
            onToggle={toggleSalaryInput}
            isVisible={showSalaryInput}
          />
          {step === 2 && (
            <>
              <MeetingDetails
                participants={participants}
                meetingTime={meetingTime}
                onParticipantsChange={setParticipants}
                onMeetingTimeChange={setMeetingTime}
              />
              <CostDisplay cost={meetingCost} />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
