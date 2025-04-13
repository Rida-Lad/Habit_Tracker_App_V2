import React, { useState } from "react";
import { CheckCircleFill, XCircleFill, ArrowLeftCircleFill } from "react-bootstrap-icons";

const TestHabits = () => {
  const questions = [
    { id: 1, text: "Do you exercise regularly?", category: "Health" },
    { id: 2, text: "Do you plan your day ahead?", category: "Productivity" },
    { id: 3, text: "Do you meditate daily?", category: "Mindfulness" },
    { id: 4, text: "Do you read books often?", category: "Learning" },
    { id: 5, text: "Do you spend time with family?", category: "Relationships" },
    { id: 6, text: "Do you eat healthy meals daily?", category: "Health" },
    { id: 7, text: "Do you set daily goals?", category: "Productivity" },
    { id: 8, text: "Do you practice gratitude?", category: "Mindfulness" },
    { id: 9, text: "Do you engage in self-learning?", category: "Learning" },
    { id: 10, text: "Do you call friends or family often?", category: "Relationships" },
    { id: 11, text: "Do you drink enough water daily?", category: "Health" },
    { id: 12, text: "Do you avoid procrastination?", category: "Productivity" },
    { id: 13, text: "Do you take breaks to clear your mind?", category: "Mindfulness" },
    { id: 14, text: "Do you take notes while learning?", category: "Learning" },
    { id: 15, text: "Do you support your loved ones emotionally?", category: "Relationships" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const categories = {
    Health: { yes: 0, no: 0 },
    Productivity: { yes: 0, no: 0 },
    Mindfulness: { yes: 0, no: 0 },
    Learning: { yes: 0, no: 0 },
    Relationships: { yes: 0, no: 0 },
  };

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsTestCompleted(true);
    }
  };

  const handleReturnToStart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsTestCompleted(false);
  };

  const calculateResults = () => {
    questions.forEach((question, index) => {
      if (answers[index] === "Yes") {
        categories[question.category].yes++;
      } else {
        categories[question.category].no++;
      }
    });

    return Object.keys(categories).map((category) => {
      const total = categories[category].yes + categories[category].no;
      const yesPercentage = total > 0 ? Math.round((categories[category].yes / total) * 100) : 0;
      const noPercentage = total > 0 ? Math.round((categories[category].no / total) * 100) : 0;

      return {
        category,
        yesPercentage,
        noPercentage,
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-gray-900 min-h-screen">
      {!isTestCompleted ? (
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
          <h4 className="text-orange-500 text-xl mb-6">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h4>
          <p className="text-gray-300 text-2xl mb-8">{questions[currentQuestionIndex].text}</p>
          
          <div className="w-full bg-gray-700 rounded-full h-3 mb-8">
            <div 
              className="bg-orange-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleAnswer("Yes")}
              className="flex items-center justify-center px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <CheckCircleFill className="mr-2 text-xl" />
              Yes
            </button>
            <button
              onClick={() => handleAnswer("No")}
              className="flex items-center justify-center px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <XCircleFill className="mr-2 text-xl" />
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl">
          <h3 className="text-orange-500 text-3xl text-center mb-8">Your Habit Test Results</h3>
          
          {calculateResults().map(({ category, yesPercentage, noPercentage }) => (
            <div key={category} className="mb-8">
              <h5 className="text-gray-300 text-xl mb-4">{category}</h5>
              
              <div className="flex items-center mb-2">
                <CheckCircleFill className="text-green-400 mr-2 text-lg" />
                <span className="text-gray-400 mr-2 font-semibold">Good Habit:</span>
                <span className="text-gray-300">{yesPercentage}%</span>
              </div>
              
              <div className="flex items-center mb-4">
                <XCircleFill className="text-red-400 mr-2 text-lg" />
                <span className="text-gray-400 mr-2 font-semibold">Needs Improvement:</span>
                <span className="text-gray-300">{noPercentage}%</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-orange-500 h-3 rounded-full inline-block" 
                  style={{ width: `${yesPercentage}%` }}
                ></div>
                <div 
                  className="bg-gray-600 h-3 rounded-full inline-block" 
                  style={{ width: `${noPercentage}%` }}
                ></div>
              </div>
            </div>
          ))}

          <div className="text-center mt-8">
            <button
              onClick={handleReturnToStart}
              className="flex items-center justify-center px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mx-auto"
            >
              <ArrowLeftCircleFill className="mr-2 text-xl" />
              Take Test Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestHabits;