import React, { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import Layout from "../../../Components/Layout";
import { getExamByModuleId } from "../../../services/employee/ExamService";
import { Modal } from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa"; // Importing thumbs-up icon
import { useSelector } from "react-redux";

import "./style.css";

const ExamPage = () => {
    const { moduleId } = useParams(); // Get the moduleId from the URL
    const navigate = useNavigate();
    const courses = useSelector((state) => state.employeeCourses?.list?.data);
    const [questions, setQuestions] = useState([]); // State to store fetched questions
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [showModal, setShowModal] = useState(false); // State to show/hide modal
    const [modalContent, setModalContent] = useState({}); // Content for the modal (correct/incorrect)

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getExamByModuleId(moduleId); // Fetch exams using the new service function
                setQuestions(data.data); // Set the fetched questions
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions(); // Call the fetch function
    }, [moduleId]);

    // Handle option selection
    const handleOptionChange = (questionId, optionIndex, isCorrect, explanation) => {
        setSelectedAnswers((prevState) => ({
            ...prevState,
            [questionId]: optionIndex,
        }));

        // Show modal based on the correctness of the answer
        if (isCorrect) {
            setModalContent({
                type: "correct",
                message: "Correct! Great job.",
                explanation: explanation,
            });
        } else {
            setModalContent({
                type: "incorrect",
                message: "You have selected the wrong answer. Please select the correct one.",
            });
        }

        setShowModal(true); // Open the modal after selecting an answer
    };

    // Handle form submission
    const handleSubmit = () => {
        let calculatedScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question._id] === question.correctAnswer) {
                calculatedScore += 1;
            }
        });
        setScore(calculatedScore);
        setShowResult(true);
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    // Handle redirection to modules after result is viewed
    const handleBackToModules = () => {
        navigate(`/employee/courses/modules/${courses[0]?._id}`); // Redirect to modules page
    };

    return (
        <Layout>
            <section className="exam-page-section grey_bg pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 mx-auto">
                            <h1 className="exam-title">Knowledge evaluation</h1>

                            {/* Display the exam questions and options */}
                            {!showResult ? (
                                <div className="exam-form">
                                    {questions.map((question, questionIndex) => (
                                        <div key={question._id} className="mb-4 question-block">
                                            <p className="question-text">
                                                {questionIndex + 1}. {question.question}
                                            </p>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="form-check">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name={`question${question._id}`}
                                                        id={`question${optionIndex}`}
                                                        value={optionIndex}
                                                        checked={selectedAnswers[question._id] === optionIndex}
                                                        onChange={() =>
                                                            handleOptionChange(
                                                                question._id,
                                                                optionIndex,
                                                                optionIndex === question.correctAnswer,
                                                                question.explanation // Pass the explanation to show when correct
                                                            )
                                                        }
                                                    />
                                                    <label for={`question${optionIndex}`} className="form-check-label">{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* Submit button */}
                                    <div className="submit-btn-container">
                                        <button className="btn-submit" onClick={handleSubmit}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="result-section">
                                    <h2 className="result-title">Your Result</h2>
                                    <p className="result-score">You scored {score} out of {questions.length}</p>
                                    <p className="result-percentage">
                                        Percentage: {((score / questions.length) * 100).toFixed(2)}%
                                    </p>
                                    
                                    {/* Back to Modules button */}
                                    <div className="submit-btn-container mt-4">
                                        <button className="btn-submit" onClick={handleBackToModules}>
                                            Okay
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal to show feedback */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalContent.type === "correct" ? "Right answer" : "Wrong answer"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {modalContent.type === "correct" ? (
                            <>
                                <div className="text-center">
                                    <FaThumbsUp className="text-success mb-3" size={50} />
                                </div>
                                <p>{modalContent.explanation}</p>
                            </>
                        ) : (
                            <p>{modalContent.message}</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={handleCloseModal}>
                            OK
                        </button>
                    </Modal.Footer>
                </Modal>
            </section>
        </Layout>
    );
};

export default ExamPage;
