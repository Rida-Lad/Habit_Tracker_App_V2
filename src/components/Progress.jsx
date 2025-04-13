import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Progress = () => {
  const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem("habits")) || []);
  const [activeTab, setActiveTab] = useState("today");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [completionStatus, setCompletionStatus] = useState(() => JSON.parse(localStorage.getItem("completionStatus")) || {});

  useEffect(() => {
    localStorage.setItem("completionStatus", JSON.stringify(completionStatus));
  }, [completionStatus]);

  const today = new Date().toISOString().split("T")[0];

  const getChartData = (habit) => {
    const totalDays = Math.ceil((new Date(habit.endDate) - new Date(habit.startDate)) / (1000 * 60 * 60 * 24) + 1);
    const completedDays = Object.keys(completionStatus[habit.habitName] || {}).length;
    const percentage = ((completedDays / totalDays) * 100).toFixed(2);
    
    return {
      labels: ["Completed", "Remaining"],
      datasets: [{
        data: [percentage, 100 - percentage],
        backgroundColor: ["#ffa500", "#374151"],
        borderWidth: 0,
      }]
    };
  };

  const markAsCompleted = (habitName) => {
    setCompletionStatus(prev => ({
      ...prev,
      [habitName]: { ...prev[habitName], [today]: true }
    }));
  };

  const handleDelete = (habitName) => {
    setHabitToDelete(habitName);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updatedHabits = habits.filter(habit => habit.habitName !== habitToDelete);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-500">Progress Tracker</h1>

      <div className="flex gap-4 justify-center mb-8">
        {["today", "all", "finished"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg ${
              activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-800 text-gray-400"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "today" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.filter(habit => 
            new Date(today) >= new Date(habit.startDate) &&
            new Date(today) <= new Date(habit.endDate)
          ).map(habit => {
            const isCompleted = completionStatus[habit.habitName]?.[today];
            return (
              <div key={habit.habitName} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-orange-400">{habit.habitName}</h3>
                <div className="w-32 h-32 mx-auto mb-4">
                  <Doughnut data={getChartData(habit)} options={{ cutout: "70%", plugins: { legend: { display: false } } }} />
                </div>
                <button
                  onClick={() => markAsCompleted(habit.habitName)}
                  disabled={isCompleted}
                  className={`w-full py-2 rounded-lg ${
                    isCompleted ? "bg-gray-700 text-gray-400" : "bg-orange-500 hover:bg-orange-600"
                  }`}
                >
                  {isCompleted ? "Completed" : "Mark Complete"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "all" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map(habit => {
            const totalDays = Math.ceil((new Date(habit.endDate) - new Date(habit.startDate)) / (1000 * 60 * 60 * 24) + 1);
            const completedDays = Object.keys(completionStatus[habit.habitName] || {}).length;
            const percentage = ((completedDays / totalDays) * 100).toFixed(2);

            return (
              <div key={habit.habitName} className="bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-2 text-orange-400">{habit.habitName}</h3>
                <p className="text-gray-400 mb-2">Start: {habit.startDate}</p>
                <p className="text-gray-400 mb-4">End: {habit.endDate}</p>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 mb-4">{percentage}% Completed</p>
                <button
                  onClick={() => handleDelete(habit.habitName)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete Habit
                </button>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "finished" && (
        <div className="space-y-4">
          {habits.filter(habit => {
            const totalDays = Math.ceil((new Date(habit.endDate) - new Date(habit.startDate)) / (1000 * 60 * 60 * 24) + 1);
            return Object.keys(completionStatus[habit.habitName] || {}).length >= totalDays;
          }).map(habit => (
            <div key={habit.habitName} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-orange-400">{habit.habitName}</h3>
                <span className="bg-green-500 text-xs px-2 py-1 rounded-full">Completed</span>
              </div>
              <p className="text-gray-400 text-sm">{habit.startDate} - {habit.endDate}</p>
            </div>
          ))}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl max-w-sm w-full mx-4">
            <p className="mb-4">Delete "{habitToDelete}" habit?</p>
            <div className="flex gap-4">
              <button onClick={confirmDelete} className="flex-1 py-2 bg-red-500 rounded-lg hover:bg-red-600">
                Yes
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;