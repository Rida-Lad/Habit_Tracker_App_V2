import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Habits.css';

const Habits = () => {
    const [showForm, setShowForm] = useState(false);
    const [habitName, setHabitName] = useState('');
    const [frequency, setFrequency] = useState('');
    const [days, setDays] = useState([]);
    const [duration, setDuration] = useState({ hours: '0', minutes: '0' });
    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState('');
    const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem('habits')) || []);
    const [popupMessage, setPopupMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const today = new Date().toISOString().split('T')[0];

        if (!habitName || !frequency || !startDate || !endDate) {
            displayPopup('Please fill out all required fields.', 'danger');
            return;
        }
        if (startDate < today) {
            displayPopup('Start date cannot be in the past.', 'danger');
            return;
        }
        if (endDate <= startDate) {
            displayPopup('End date must be later than the start date.', 'danger');
            return;
        }
        if (duration.hours === '0' && duration.minutes === '0') {
            displayPopup('Duration must be at least 15 minute.', 'danger');
            return;
        }
        if (frequency === 'weekly' && days.length === 0) {
            displayPopup('Please select at least one day for weekly frequency.', 'danger');
            return;
        }

        const habit = { habitName, frequency, days, duration, startDate, endDate };
        setHabits((prev) => [...prev, habit]);
        setShowForm(false);
        displayPopup('Habit added successfully!', 'success');

        setHabitName('');
        setFrequency('');
        setDays([]);
        setDuration({ hours: '0', minutes: '0' });
        setStartDate(today);
        setEndDate('');
    };

    const displayPopup = (message, type) => {
        setPopupMessage(message);
        setMessageType(type);
        setTimeout(() => {
            setPopupMessage('');
        }, 2000);
    };

    return (
        <div className="container py-5" style={{ fontFamily: 'Quicksand', color: '#ffa500', backgroundColor: 'white' }}>
            <div className="text-center mb-4">
                <h1>Welcome to Your Habit Tracker</h1>
                <p>Start building your best habits today!</p>
            </div>
            <div className="d-flex justify-content-center gap-3 mb-4">
                <button className="btn btn-outline" style={{ color: '#ffa500', borderColor: '#ffa500' }} onClick={() => setShowForm(true)}>Add Personalized Habit</button>
                <button className="btn btn-primary" style={{ backgroundColor: '#ffa500', borderColor: '#ffa500' }} onClick={() => navigate('/test')}>Find Your Best Habits</button>
            </div>
            {popupMessage && (
                <div className={`alert alert-${messageType} position-fixed top-0 start-50 translate-middle-x`} style={{ zIndex: 1050, width: 'fit-content', padding: '10px 20px', marginTop: '10px' }}>{popupMessage}</div>
            )}
            {showForm && (
                <form className="bg-white p-4 rounded shadow" onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Habit Name</label>
                        <input type="text" className="form-control" value={habitName} onChange={(e) => setHabitName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Frequency</label>
                        <select className="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
                            <option value="">Select Frequency</option>
                            <option value="everyday">Everyday</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>
                    {frequency === 'weekly' && (
                        <div className="mb-3">
                            <label className="form-label">Select Days</label>
                            <div>{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <div className="form-check form-check-inline" key={day}>
                                    <input type="checkbox" className="form-check-input" id={day} value={day} onChange={(e) => {
                                        setDays((prev) => e.target.checked ? [...prev, day] : prev.filter((d) => d !== day));
                                    }} />
                                    <label className="form-check-label" htmlFor={day}>{day}</label>
                                </div>
                            ))}</div>
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Duration</label>
                        <div className="d-flex gap-2">
                            <select className="form-select" value={duration.hours} onChange={(e) => setDuration((prev) => ({ ...prev, hours: e.target.value }))} required>
                                {[...Array(4).keys()].map((n) => (<option key={n} value={n}>{n} Hours</option>))}
                            </select>
                            <select className="form-select" value={duration.minutes} onChange={(e) => setDuration((prev) => ({ ...prev, minutes: e.target.value }))} required>
                                {[0, 15, 30, 45].map((n) => (<option key={n} value={n}>{n} Minutes</option>))}
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input type="date" className="form-control" value={startDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input type="date" className="form-control" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#ffa500', borderColor: '#ffa500' }}>Save Habit</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Habits;
