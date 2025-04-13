import React, { useState, useEffect, useCallback, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Progress.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Progress = () => {
  const [habits, setHabits] = useState(() => {
    return JSON.parse(localStorage.getItem("habits")) || [];
  });
  const [today, setToday] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [completionStatus, setCompletionStatus] = useState(() => {
    return JSON.parse(localStorage.getItem("completionStatus")) || {};
  });
  const [lastNotificationTimes, setLastNotificationTimes] = useState(() => {
    return JSON.parse(localStorage.getItem("lastNotificationTimes")) || {};
  });

  const currentDateRef = useRef(new Date().toDateString());

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem(
      "lastNotificationTimes",
      JSON.stringify(lastNotificationTimes)
    );
  }, [lastNotificationTimes]);

  useEffect(() => {
    localStorage.setItem("completionStatus", JSON.stringify(completionStatus));
  }, [completionStatus]);

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setToday(new Date());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const getTodayDate = useCallback(
    () => today.toISOString().split("T")[0],
    [today]
  );

  const getDayOfWeek = useCallback(
    () => today.toLocaleDateString("en-US", { weekday: "long" }),
    [today]
  );

  const isHabitScheduledForToday = useCallback(
    (habit) => {
      const { startDate, endDate, frequency, days } = habit;
      const todayDate = getTodayDate();
      const dayOfWeek = getDayOfWeek();

      if (
        new Date(todayDate) < new Date(startDate) ||
        new Date(todayDate) > new Date(endDate)
      ) {
        return false;
      }

      if (frequency === "everyday") {
        return true;
      }

      if (frequency === "weekly" && days.includes(dayOfWeek)) {
        return true;
      }

      return false;
    },
    [getTodayDate, getDayOfWeek]
  );

  const todayHabits = habits.filter(isHabitScheduledForToday);

  const uncompletedHabits = todayHabits.filter((habit) => {
    const todayDate = getTodayDate();
    return !completionStatus[habit.habitName]?.[todayDate];
  });

  const showHabitNotifications = useCallback(() => {
    if (Notification.permission !== "granted") return;

    const now = new Date();

    uncompletedHabits.forEach((habit) => {
      const lastNotificationTime = lastNotificationTimes[habit.habitName];
      const shouldNotify = !lastNotificationTime || 
                          new Date(lastNotificationTime).toDateString() !== now.toDateString();

      if (shouldNotify) {
        new Notification(`Habit Reminder: ${habit.habitName}`, {
          body: `Don't forget to complete "${habit.habitName}" today!`,
          icon: "path/to/icon.png",
        });

        setLastNotificationTimes(prev => ({
          ...prev,
          [habit.habitName]: now.toISOString()
        }));
      }
    });
  }, [uncompletedHabits, lastNotificationTimes]);

  useEffect(() => {
    const checkDayChange = () => {
      const newDate = new Date().toDateString();
      if (newDate !== currentDateRef.current) {
        currentDateRef.current = newDate;
        setLastNotificationTimes({});
        if (Notification.permission === "granted") {
          showHabitNotifications();
        }
      }
    };

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showHabitNotifications();
        }
      });
    } else {
      showHabitNotifications();
    }

    const interval = setInterval(checkDayChange, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [showHabitNotifications]);

  useEffect(() => {
    const habitNames = new Set(habits.map((h) => h.habitName));
    setLastNotificationTimes((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((habitName) => {
        if (!habitNames.has(habitName)) {
          delete updated[habitName];
        }
      });
      return updated;
    });
  }, [habits]);

  const markAsCompleted = (habitName) => {
    const todayDate = getTodayDate();
    setCompletionStatus((prev) => ({
      ...prev,
      [habitName]: {
        ...prev[habitName],
        [todayDate]: true,
      },
    }));
  };

  const openDeletePopup = (habitName) => {
    setHabitToDelete(habitName);
    setShowPopup(true);
  };

  const closeDeletePopup = () => {
    setHabitToDelete(null);
    setShowPopup(false);
  };

  const confirmDeleteHabit = () => {
    const updatedHabits = habits.filter(
      (habit) => habit.habitName !== habitToDelete
    );
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    closeDeletePopup();
  };

  const calculateCompletionPercentage = (habit) => {
    const totalDays = Math.ceil(
      (new Date(habit.endDate) - new Date(habit.startDate)) /
        (1000 * 60 * 60 * 24) +
        1
    );
    const completedDays = Object.keys(
      completionStatus[habit.habitName] || {}
    ).length;
    return ((completedDays / totalDays) * 100).toFixed(2);
  };

  const finishedHabits = habits.filter(
    (habit) =>
      Object.keys(completionStatus[habit.habitName] || {}).length ===
      Math.ceil(
        (new Date(habit.endDate) - new Date(habit.startDate)) /
          (1000 * 60 * 60 * 24) +
          1
      )
  );

  const getChartData = (habit) => {
    const percentage = calculateCompletionPercentage(habit);
    return {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [percentage, 100 - percentage],
          backgroundColor: ["#ffa500", "#e0e0e0"],
          borderColor: ["#ffa500", "#e0e0e0"],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div
      className="container py-5"
      style={{
        fontFamily: "Quicksand",
        color: "#ffa500",
        backgroundColor: "white",
      }}
    >
      <h1 className="text-center mb-4">Progress Tracker</h1>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#today">
            Today's Habits
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#all">
            All Habits
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#finished">
            Finished Habits
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="today">
          {todayHabits.length === 0 ? (
            <p className="text-center">No habits scheduled for today.</p>
          ) : (
            <div className="row">
              {todayHabits.map((habit) => {
                const isCompleted =
                  completionStatus[habit.habitName]?.[getTodayDate()];
                const { hours, minutes } = habit.duration || {
                  hours: 0,
                  minutes: 0,
                };
                return (
                  <div className="col-md-4 mb-4" key={habit.habitName}>
                    <div className="card shadow-lg border-0 rounded-4">
                      <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-orange mb-3">
                          {habit.habitName}
                        </h5>
                        <p className="text-muted">
                          ⏳ <strong>Duration:</strong> {hours}h {minutes}m
                        </p>
                        <div className="d-flex justify-content-center align-items-center my-3">
                          <div style={{ width: "130px", height: "130px" }}>
                            <Doughnut
                              data={getChartData(habit)}
                              options={chartOptions}
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-lg w-100 mt-3 fw-semibold"
                          style={{
                            backgroundColor: isCompleted ? "gray" : "#ffa500",
                            borderColor: isCompleted ? "gray" : "#ffa500",
                            color: "white",
                            borderRadius: "8px",
                          }}
                          onClick={() => markAsCompleted(habit.habitName)}
                          disabled={isCompleted}
                        >
                          {isCompleted ? "✔ Completed" : "✅ Mark as Completed"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="tab-pane fade" id="all">
          {habits.length === 0 ? (
            <p className="text-center">No habits found.</p>
          ) : (
            <div className="row">
              {habits.map((habit) => {
                const percentage = calculateCompletionPercentage(habit);
                return (
                  <div className="col-md-4 mb-4" key={habit.habitName}>
                    <div className="card shadow-lg border-0 rounded-4">
                      <div className="card-body text-center bg-light">
                        <h5
                          className="card-title fw-bold"
                          style={{ color: "#ff8c00" }}
                        >
                          {habit.habitName}
                        </h5>
                        <p className="text-muted mb-1">
                          <strong>Start Date:</strong> {habit.startDate}
                        </p>
                        <p className="text-muted mb-1">
                          <strong>End Date:</strong> {habit.endDate}
                        </p>
                        <div
                          className="progress my-2"
                          style={{ height: "8px" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${percentage}%` }}
                            aria-valuenow={percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <p className="text-muted">
                          <strong>Completion:</strong> {percentage}%
                        </p>
                        <button
                          className="btn btn-danger btn-sm px-3 rounded-pill mt-2"
                          onClick={() => openDeletePopup(habit.habitName)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="tab-pane fade" id="finished">
          {finishedHabits.length === 0 ? (
            <p className="text-center">No finished habits yet.</p>
          ) : (
            <ul className="list-group mt-3 shadow-lg rounded-4">
              {finishedHabits.map((habit) => (
                <li
                  className="list-group-item d-flex flex-column bg-light border rounded px-4 py-3 mb-2"
                  key={habit.habitName}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-orange">
                      {habit.habitName}
                    </span>
                    <span className="badge bg-success rounded-pill px-3 py-1">
                      Completed
                    </span>
                  </div>
                  <p className="text-muted mb-1 mt-2">
                    <strong>Start Date:</strong> {habit.startDate}
                  </p>
                  <p className="text-muted mb-2">
                    <strong>End Date:</strong> {habit.endDate}
                  </p>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `100%` }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="custom-popup">
          <div className="popup-content">
            <p>Are you sure you want to delete the habit "{habitToDelete}"?</p>
            <button
              className="btn btn-danger me-2"
              onClick={confirmDeleteHabit}
            >
              Yes
            </button>
            <button className="btn btn-secondary" onClick={closeDeletePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
