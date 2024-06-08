import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing360 from './Landing360';

const Events = ({ title }) => {
  const [searchEventId, setSearchEventId] = useState('');
  const [searchEventName, setSearchEventName] = useState('');
  const [searchEventLocation, setSearchEventLocation] = useState('');
 
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetchEvents();
  }, []);
 
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8002/api/studentEvents');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const filterData = useCallback(() => {
    let filteredData = events;
 
    if (searchEventId) {
      filteredData = filteredData.filter(event => 
        event.EVENT_ID.toString().toLowerCase().includes(searchEventId.toLowerCase())
      );
    }
    if (searchEventName) {
      filteredData = filteredData.filter(event => 
        event.EVENT_NAME.toLowerCase().includes(searchEventName.toLowerCase())
      );
    }
    if (searchEventLocation) {
      filteredData = filteredData.filter(event => 
        event.EVENT_LOCATION.toLowerCase().includes(searchEventLocation.toLowerCase())
      );
    }
 
    setFilteredEvents(filteredData);
  }, [searchEventId, searchEventName, searchEventLocation, events]);

  useEffect(() => {
    filterData();
  }, [filterData]);
  
  const handleReset = () => {
    setSearchEventId('');
    setSearchEventName('');
    setSearchEventLocation('');
    setFilteredEvents(events);
  };
 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric',time: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .header-input {
        background-color: #009CE0;
        color: white;
        border: 2px solid #ccc;
        padding: 5px;
        border-radius: 3px;
        box-shadow: inset 0 1px 2px rgba(234, 218, 218, 0.1);
        text-align: center;
        margin-right: 15px;
      }
 
      .header-input::placeholder {
        color: white;
      }
 
      .filter-dropdown, .search-box {
        width: 140px; /* Adjust the width as needed */
        margin-right: 15px; /* Adjust the margin as needed */
      }
 
      .filter-container label {
        margin-right: 5px;
      }
 
      .table td, .table th {
        border: 3px solid #dee2e6;  /* Add border to all table cells */
        padding: 5px;
        text-align: center; /* Center align the text in table data cells */
        white-space: nowrap; /* Ensure content in columns doesn't wrap */
        overflow: hidden; /* Hide content if it overflows */
        text-overflow: ellipsis; /* Show ellipsis (...) if content overflows */
        font-family: 'Arial', sans-serif; /* Set font family */
      }
      .sticky-header th {
        position: sticky;
        top: 0;
        z-index: 999;
        background-color: #ffffff; /* Set background color for sticky header */
      }
 
      .search-input {
        background-color: grey; /* Set the background color */
      }
 
      .search-input {
        background-color: transparent; /* Remove the background color */
      }
 
      .table-container {
        max-height: 80vh; /* Set max height for the table */
        overflow-y: auto; /* Enable vertical scrolling */
      }
    `;
    document.head.appendChild(style);
 
    return () => {
      document.head.removeChild(style);
    };
  }, []);
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div className="header-container">
      <Landing360 />
      <div className="container-fluid header-container" style={{ width: '100%', marginTop: '13vh', padding: 0 }}>
        <div className="container-fluid d-flex flex-column" style={{ minHeight: '100vh' }}>
          <div className="p-2 mb-2 d-flex justify-content-between align-items-center" style={{ background: '#34495E', color: '#FFFFFF' }}>
            <h1 style={{ fontSize: '1.5rem' }}> Event Planning</h1>
          </div>
          <div className="filter-container d-flex justify-content-start mb-3 flex-wrap">
            <div className="filter-group d-flex align-items-center">
              <label htmlFor="eventId" className="mr-2" style={{ fontWeight: 'bold' }}>Event Id</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input black-border"
                value={searchEventId}
                onChange={(e) => setSearchEventId(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="eventName" className="mr-2" style={{ fontWeight: 'bold' }}>Event Name</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input"
                value={searchEventName}
                onChange={(e) => setSearchEventName(e.target.value)}
              />
            </div>
            <div className="filter-group d-flex align-items-center ml-3">
              <label htmlFor="eventLocation" className="mr-2" style={{ fontWeight: 'bold' }}>Event Location</label>
              <input
                type="text"
                placeholder=""
                className="form-control search-box search-input"
                value={searchEventLocation}
                onChange={(e) => setSearchEventLocation(e.target.value)}
              />
            </div>
            <div className="ml-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleReset}
                style={{ background: '#0d2b84', border: 'none' }}
              >
                Reset
              </button>
            </div>
          </div>
          <hr style={{ width: '100%', height: '1px', backgroundColor: 'grey', margin: '10px 0' }} />
          <div className="table-responsive table-container">
          <table className="table table-striped">
              <thead className="thead-dark sticky-header">
                <tr>
                  <th scope="col">Event ID</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Event Description</th>
                  <th scope="col">Event Start Date</th>
                  <th scope="col">Event End Date</th>
                  <th scope="col">Event Location</th>
                  <th scope="col">Rec Create Date</th>
                  <th scope="col">Create By</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map(event => (
                  <tr key={event.EVENT_ID}>
                    <td className="sticky-column">{event.EVENT_ID}</td>
                    <td>{event.EVENT_NAME}</td>
                    <td>{event.EVENT_DESCRIPTION}</td>
                    <td>{formatDate(event.EVENT_START_DATE)}</td>
                    <td>{formatDate(event.EVENT_END_DATE)}</td>
                    <td>{event.EVENT_LOCATION}</td>
                    <td>{formatDate(event.REC_CREATE_DATE)}</td>
                    <td>{event.CREATED_BY}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default Events;
