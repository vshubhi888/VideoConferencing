import React, { useEffect, useState } from 'react';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [meetingStatus, setMeetingStatus] = useState(null);
  
  // Dummy stats for meetings
  const upcomingMeetings = 2;
  const completedMeetings = 8;
  const totalMeetingTime = "5h 30m";

  const handleStartMeeting = () => {
    setMeetingStatus("Meeting started successfully! (dummy)");
  };

  const handleJoinMeeting = () => {
    setMeetingStatus("Joined meeting! (dummy)");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">User Dashboard</h2>
      
        </div>
        <div className="card-body">
          <div className="row text-center mb-4">
            <div className="col-md-4 mb-3">
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">Upcoming Meetings</h5>
                  <p className="card-text display-6">{upcomingMeetings}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-success">
                <div className="card-body">
                  <h5 className="card-title">Completed Meetings</h5>
                  <p className="card-text display-6">{completedMeetings}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-warning">
                <div className="card-body">
                  <h5 className="card-title">Total Meeting Time</h5>
                  <p className="card-text display-6">{totalMeetingTime}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4 className="mb-3">Quick Actions</h4>
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-outline-primary" onClick={handleStartMeeting}>Start Meeting</button>
            <button className="btn btn-outline-success" onClick={handleJoinMeeting}>Join Meeting</button>
            <button className="btn btn-outline-info">Profile</button>
          </div>
          {(meetingStatus) && (
            <div className="alert mt-3" style={{ color: meetingStatus.includes('success') ? 'green' : 'blue' }}>
              {meetingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};