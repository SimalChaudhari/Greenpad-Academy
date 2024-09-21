import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Components/Layout";
import "./style.css"; 

const ExamPage = () => {
    const { moduleId } = useParams(); // Get the moduleId from the URL
  
    // Sample questions and answers
    const questions = [
      {
        id: 1,
        question: "What is React?",
        options: [
          "A library",
          "A framework",
          "A database",
          "A programming language",
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: "What is JSX?",
        options: [
          "A templating engine",
          "A syntax extension",
          "A library",
          "None",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What is a component?",
        options: ["A function", "A class", "Both", "None"],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: "Which hook is used for side effects?",
        options: ["useState", "useEffect", "useContext", "useRef"],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: "What is useState?",
        options: [
          "State management",
          "Data fetching",
          "Side effects",
          "Routing",
        ],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: "How to create a context?",
        options: ["createContext", "useState", "useReducer", "useEffect"],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: "What is the default hook for state management?",
        options: ["useState", "useEffect", "useReducer", "useRef"],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: "What is React primarily used for?",
        options: [
          "API integration",
          "Server-side rendering",
          "Building UI",
          "Data fetching",
        ],
        correctAnswer: 2,
      },
      {
        id: 9,
        question: "Which of these is not a React feature?",
        options: [
          "JSX",
          "Virtual DOM",
          "Server-side rendering",
          "Database integration",
        ],
        correctAnswer: 3,
      },
      {
        id: 10,
        question: "How do you pass data between components?",
        options: ["Props", "State", "useEffect", "useContext"],
        correctAnswer: 0,
      },
    ];
  
    // State to track user's selected answers
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
  
    // Handle option selection
    const handleOptionChange = (questionId, optionIndex) => {
      setSelectedAnswers((prevState) => ({
        ...prevState,
        [questionId]: optionIndex,
      }));
    };
  
    // Handle form submission
    const handleSubmit = () => {
      let calculatedScore = 0;
      questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);
      setShowResult(true);
    };
  
    return (
      <Layout>
        <section className="exam-page-section grey_bg pt-5 pb-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 mx-auto">
                <h1 className="exam-title">Exam for Module {moduleId}</h1>
  
                {/* Display the exam questions and options */}
                {!showResult ? (
                  <div className="exam-form">
                    {questions.map((question, questionIndex) => (
                      <div key={question.id} className="mb-4 question-block">
                        <p className="question-text">
                          {questionIndex + 1}. {question.question}
                        </p>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name={`question${question.id}`}
                              value={optionIndex}
                              checked={
                                selectedAnswers[question.id] === optionIndex
                              }
                              onChange={() =>
                                handleOptionChange(question.id, optionIndex)
                              }
                            />
                            <label className="form-check-label">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
  
                    {/* Submit button */}
                    <button
                      className="btn btn-primary btn-block mt-4"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="result-section">
                    <h2 className="result-title">Your Result</h2>
                    <p className="result-score">
                      You scored {score} out of {questions.length}
                    </p>
                    <p className="result-percentage">
                      Percentage:{" "}
                      {((score / questions.length) * 100).toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  };
  
  export default ExamPage;