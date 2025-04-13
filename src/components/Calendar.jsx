import React, { useState, useEffect } from "react";
import "./Calendar.css";

const HabitsCalendar = () => {
  const [habits, setHabits] = useState([]);
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getColorForHabit = (habitName) => {
    let hash = 0;
    for (let i = 0; i < habitName.length; i++) {
      hash = habitName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - c.length) + c;
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           date.month === today.getMonth() && 
           date.year === today.getFullYear();
  };

  const changeMonth = (delta) => {
    setDate(prevDate => {
      let newMonth = prevDate.month + delta;
      let newYear = prevDate.year;

      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      return {
        month: newMonth,
        year: newYear
      };
    });
  };

  const renderCalendar = () => {
    const firstDay = new Date(date.year, date.month, 1).getDay();
    const daysInMonth = getDaysInMonth(date.year, date.month);

    const days = Array.from({ length: firstDay }, (_, i) => (
      <div key={`empty-${i}`} className="calendar-day empty"></div>
    ));

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(date.year, date.month, day);
      currentDate.setHours(0, 0, 0, 0);

      const habitsForDay = habits.filter(({ startDate, endDate, frequency, days }) => {
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(0, 0, 0, 0);
        const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "long" });
        return currentDate >= start && currentDate <= end &&
          (frequency === "everyday" || (frequency === "weekly" && days.includes(dayOfWeek)));
      });

      days.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${habitsForDay.length ? "has-habits" : ""} ${isToday(day) ? "today" : ""}`}
        >
          <div className="day-number">{day}</div>
          {habitsForDay.length > 0 && (
            <div className="habit-indicators">
              {habitsForDay.map((habit, index) => (
                <div 
                  key={`${day}-${habit.habitName}-${index}`} 
                  className="habit-indicator" 
                  style={{ backgroundColor: getColorForHabit(habit.habitName) }} 
                  title={habit.habitName}
                >
                  {habit.habitName.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const getCurrentMonthDisplay = () => {
    return new Date(date.year, date.month).toLocaleString("default", { 
      month: "long", 
      year: "numeric" 
    });
  };

  return (
    <div className="habits-calendar-container">
      <div className="habits-calendar">
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)} type="button">❮</button>
          <h2>{getCurrentMonthDisplay()}</h2>
          <button onClick={() => changeMonth(1)} type="button">❯</button>
        </div>
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
      </div>
      <div className="habits-legend">
        <h3>Your Habits</h3>
        {habits.length > 0 ? (
          habits.map((habit, index) => (
            <div key={`legend-${habit.habitName}-${index}`} className="habit-legend-item">
              <div 
                className="habit-legend-dot" 
                style={{ backgroundColor: getColorForHabit(habit.habitName) }}
              ></div>
              <span className="habit-legend-name">{habit.habitName}</span>
            </div>
          ))
        ) : (
          <div className="no-habits-message">
            No habits added yet. Start building better habits by adding your first one!
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitsCalendar;