import React, { useState, useEffect } from 'react';

interface MeetingDetailsProps {
  participants: string;
  meetingTime: string;
  onParticipantsChange: (value: string) => void;
  onMeetingTimeChange: (value: string) => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  participants,
  meetingTime,
  onParticipantsChange,
  onMeetingTimeChange
}) => {
  // Convert total minutes to hours and minutes
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('0');

  // Initialize hours and minutes from meetingTime
  useEffect(() => {
    const totalMinutes = parseInt(meetingTime) || 0;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    setHours(h.toString());
    setMinutes(m.toString());
  }, [meetingTime]);

  // Update total minutes when hours or minutes change
  const handleHoursChange = (value: string) => {
    setHours(value);
    const h = parseInt(value) || 0;
    const m = parseInt(minutes) || 0;
    onMeetingTimeChange((h * 60 + m).toString());
  };

  const handleMinutesChange = (value: string) => {
    setMinutes(value);
    const h = parseInt(hours) || 0;
    const m = parseInt(value) || 0;
    onMeetingTimeChange((h * 60 + m).toString());
  };

  return (
    <form>
      <div>
        <label htmlFor="participants">Number of Participants: </label>
        <input
          type="number"
          id="participants"
          value={participants}
          onChange={(e) => onParticipantsChange(e.target.value)}
          placeholder="Enter number of participants"
          min="1"
          required
        />
      </div>
      <div>
        <label htmlFor="meetingTime">Meeting Duration: </label>
        <div className="time-inputs">
          <div>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => handleHoursChange(e.target.value)}
              placeholder="Hours"
              min="0"
              required
            />
            <label htmlFor="hours"> hours</label>
          </div>
          <div>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              placeholder="Minutes"
              min="0"
              max="59"
              required
            />
            <label htmlFor="minutes"> minutes</label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MeetingDetails; 