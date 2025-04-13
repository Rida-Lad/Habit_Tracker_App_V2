import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="max-w-7xl mx-auto py-12 px-4 bg-gray-900 min-h-screen">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-orange-500 mb-4">
                    Welcome to Your Habit Tracker
                </h1>
                <p className="text-gray-400">
                    Start building your best habits today!
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button
                    className="px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => setShowForm(true)}
                >
                    Add Personalized Habit
                </button>
                <button
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={() => navigate('/test')}
                >
                    Find Your Best Habits
                </button>
            </div>

            {popupMessage && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg ${
                    messageType === 'danger' 
                        ? 'bg-red-800 text-red-100'
                        : 'bg-green-800 text-green-100'
                }`}>
                    {popupMessage}
                </div>
            )}

            {showForm && (
                <form 
                    className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-2xl mx-auto"
                    onSubmit={handleFormSubmit}
                >
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Habit Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={habitName}
                            onChange={(e) => setHabitName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Frequency</label>
                        <select
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            required
                        >
                            <option value="">Select Frequency</option>
                            <option value="everyday">Everyday</option>
                            <option value="weekly">Weekly</option>
                        </select>
                    </div>

                    {frequency === 'weekly' && (
                        <div className="mb-6">
                            <label className="block text-gray-300 mb-2">Select Days</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                    <div key={day} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id={day}
                                            value={day}
                                            className="w-5 h-5 accent-orange-500 bg-gray-700"
                                            onChange={(e) => {
                                                setDays((prev) => e.target.checked 
                                                    ? [...prev, day] 
                                                    : prev.filter((d) => d !== day)
                                                );
                                            }}
                                        />
                                        <label 
                                            htmlFor={day}
                                            className="text-gray-300"
                                        >
                                            {day}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Duration</label>
                        <div className="flex gap-4">
                            <select
                                className="w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                value={duration.hours}
                                onChange={(e) => setDuration((prev) => ({ ...prev, hours: e.target.value }))}
                                required
                            >
                                {[...Array(4).keys()].map((n) => (
                                    <option key={n} value={n}>{n} Hours</option>
                                ))}
                            </select>
                            <select
                                className="w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                value={duration.minutes}
                                onChange={(e) => setDuration((prev) => ({ ...prev, minutes: e.target.value }))}
                                required
                            >
                                {[0, 15, 30, 45].map((n) => (
                                    <option key={n} value={n}>{n} Minutes</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">Start Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={startDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2">End Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            Save Habit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Habits;