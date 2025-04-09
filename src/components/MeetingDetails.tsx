import React from 'react';

interface MeetingDetailsProps {
  participants: string;
  meetingTime: string;
  onParticipantsChange: (value: string) => void;
  onMeetingTimeChange: (value: string) => void;
  onBack: () => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  participants,
  meetingTime,
  onParticipantsChange,
  onMeetingTimeChange,
  onBack
}) => {
  return (
    <>
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
          <label htmlFor="meetingTime">Meeting Duration (minutes): </label>
          <input
            type="number"
            id="meetingTime"
            value={meetingTime}
            onChange={(e) => onMeetingTimeChange(e.target.value)}
            placeholder="Enter meeting duration"
            min="1"
            required
          />
        </div>
      </form>
      <button className="back-button" onClick={onBack}>
        Back to Hourly Rate
      </button>
    </>
  );
};

export default MeetingDetails; 