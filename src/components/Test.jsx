import React, { useState } from "react";
import { ProgressBar, Button, Card, Container } from "react-bootstrap";
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
    <Container className="mt-5 mb-5">
      {!isTestCompleted ? (
        <Card className="p-5 text-center shadow" style={{ backgroundColor: "#fff", color: "#ffa500" }}>
          <h4 className="mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h4>
          <p className="fs-4 mb-4">{questions[currentQuestionIndex].text}</p>
          <ProgressBar
            now={(currentQuestionIndex / questions.length) * 100}
            animated
            striped
            className="mb-4"
            style={{ backgroundColor: "#f0f0f0" }}
            variant="warning"
          />
          <div className="mt-4">
            <Button
              style={{ backgroundColor: "#ffa500", border: "none", color: "white" }}
              onClick={() => handleAnswer("Yes")}
              className="mx-3 px-4 py-2"
            >
              <CheckCircleFill className="me-2" />
              Yes
            </Button>
            <Button
              style={{ backgroundColor: "white", border: "2px solid #ffa500", color: "#ffa500" }}
              onClick={() => handleAnswer("No")}
              className="mx-3 px-4 py-2"
            >
              <XCircleFill className="me-2" />
              No
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-5 shadow" style={{ backgroundColor: "#fff", color: "#ffa500" }}>
          <h3 className="mb-4 text-center">Your Habit Test Results</h3>
          {calculateResults().map(({ category, yesPercentage, noPercentage }) => (
            <div key={category} className="mb-5">
              <h5 className="mb-3">{category}</h5>
              <div className="d-flex align-items-center mb-2">
                <CheckCircleFill className="text-success me-2" />
                <strong className="me-2">Good Habit:</strong> {yesPercentage}%
              </div>
              <div className="d-flex align-items-center mb-3">
                <XCircleFill className="text-danger me-2" />
                <strong className="me-2">Needs Improvement:</strong> {noPercentage}%
              </div>
              <ProgressBar style={{ height: "12px" }}>
                <ProgressBar
                  style={{ backgroundColor: "#ffa500" }}
                  now={yesPercentage}
                  key={1}
                />
                <ProgressBar
                  style={{ backgroundColor: "#f0f0f0" }}
                  now={noPercentage}
                  key={2}
                />
              </ProgressBar>
            </div>
          ))}
          <div className="text-center mt-4">
            <Button
              style={{ backgroundColor: "#ffa500", border: "none", color: "white" }}
              onClick={handleReturnToStart}
              className="px-4 py-2"
            >
              <ArrowLeftCircleFill className="me-2" />
              Take Test Again
            </Button>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default TestHabits;