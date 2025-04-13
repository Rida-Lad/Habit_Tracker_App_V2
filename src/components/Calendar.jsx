import React, { useState, useEffect } from "react";

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
      <div key={`empty-${i}`} className="h-24 p-2 border border-gray-700 bg-gray-800"></div>
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
          className={`h-24 p-2 border ${
            isToday(day) ? "border-orange-500" : "border-gray-700"
          } bg-gray-800 relative hover:bg-gray-700 transition-colors`}
        >
          <div className="text-gray-300 text-sm">{day}</div>
          {habitsForDay.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {habitsForDay.map((habit, index) => (
                <div 
                  key={`${day}-${habit.habitName}-${index}`} 
                  className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
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
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-900 min-h-screen text-gray-100">
      <div className="md:w-2/3">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6 px-4 py-2 bg-gray-700 rounded-lg">
            <button 
              onClick={() => changeMonth(-1)}
              className="text-2xl hover:text-orange-500 transition-colors"
            >
              ❮
            </button>
            <h2 className="text-xl font-semibold">{getCurrentMonthDisplay()}</h2>
            <button 
              onClick={() => changeMonth(1)}
              className="text-2xl hover:text-orange-500 transition-colors"
            >
              ❯
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-700">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center py-2 bg-gray-800 text-gray-400 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-700 mt-px">
            {renderCalendar()}
          </div>
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl h-fit">
          <h3 className="text-xl font-semibold mb-4">Your Habits</h3>
          {habits.length > 0 ? (
            <div className="space-y-3">
              {habits.map((habit, index) => (
                <div key={`legend-${habit.habitName}-${index}`} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getColorForHabit(habit.habitName) }}
                  ></div>
                  <span className="text-gray-300">{habit.habitName}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400 italic">
              No habits added yet. Start building better habits by adding your first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitsCalendar;