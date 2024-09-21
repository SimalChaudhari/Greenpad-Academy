import React, { useState, useEffect } from "react";
import axios from "axios";

const ModuleExam = ({ moduleId }) => {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch the exam for the module when the component mounts
    axios
      .get(`/api/exams/getExam/${moduleId}`)
      .then((response) => setExam(response.data))
      .catch((error) => console.error("Error fetching the exam:", error));
  }, [moduleId]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    let score = 0;
    exam.questions.forEach((question, questionIndex) => {
      const correctOption = question.options.findIndex((opt) => opt.isCorrect);
      if (correctOption === answers[questionIndex]) {
        score += 1;
      }
    });
    setScore(score);
    setSubmitted(true);
  };

  if (!exam) {
    return <div>Loading exam...</div>;
  }

  return (
    <div>
      <h2>Module Exam</h2>
      {exam.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <p>{question.questionText}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                name={`question-${questionIndex}`}
                value={optionIndex}
                checked={answers[questionIndex] === optionIndex}
                onChange={() => handleOptionChange(questionIndex, optionIndex)}
              />
              {option.optionText}
            </label>
          ))}
        </div>
      ))}
      {!submitted ? (
        <button onClick={handleSubmit}>Submit Exam</button>
      ) : (
        <div>
          <h3>Score: {score}/{exam.questions.length}</h3>
        </div>
      )}
    </div>
  );
};

export default ModuleExam;
