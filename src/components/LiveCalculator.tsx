import React, { useState, useEffect, useRef } from 'react';

interface LiveCalculatorProps {
  salary: string;
  participants: string;
  meetingTime: string;
}

const LiveCalculator: React.FC<LiveCalculatorProps> = ({
  salary,
  participants,
  meetingTime
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  // Calculate cost per minute based on salary and participants
  const calculateCostPerMinute = (): number => {
    const hourlyRate = parseFloat(salary) || 0;
    const numParticipants = parseInt(participants) || 0;
    return (hourlyRate * numParticipants) / 60;
  };

  // Start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      const costPerMinute = calculateCostPerMinute();
      
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(prevTime => {
          const newTime = prevTime + 1;
          // Update total cost every second
          setTotalCost(costPerMinute * (newTime / 60));
          return newTime;
        });
      }, 1000);
    }
  };

  // Pause the stopwatch
  const pauseStopwatch = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setElapsedTime(0);
    setTotalCost(0);
  };

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  return (
    <div className="live-calculator">
      <h3>Live Cost Calculation</h3>
      <div className="stopwatch-container">
        <div className="stopwatch-display">
          <div className="time-display">{formatTime(elapsedTime)}</div>
          <div className="cost-display">${totalCost.toFixed(2)}</div>
        </div>
        <div className="stopwatch-controls">
          {!isRunning ? (
            <button className="start-button" onClick={startStopwatch}>
              Start
            </button>
          ) : (
            <button className="pause-button" onClick={pauseStopwatch}>
              Pause
            </button>
          )}
          <button className="reset-button" onClick={resetStopwatch}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveCalculator; 