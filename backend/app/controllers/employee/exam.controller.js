const db = require("../../models");
const Module = db.Module;
const Course = db.Course;
const Exam = db.Exam; // Import the Exam model

// Function to create an exam
exports.createExam = async (req, res) => {
  const { question, options, correctAnswer, moduleId } = req.body;

  try {
    // Check if the module exists
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found.' });
    }

    // Create new exam
    const newExam = new Exam({
      question,
      options,
      correctAnswer,
      module: moduleId, // Associate exam with module
    });

    const savedExam = await newExam.save();
    res.status(201).json({
      message: 'Exam created successfully!',
      data: savedExam,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to get exams by module ID
exports.getExamsByModuleId = async (req, res) => {
  const { moduleId } = req.params;

  try {
    // Fetch exams associated with the specified module
    const exams = await Exam.find({ module: moduleId });
    res.status(200).json({
      data: exams,
      message: 'Retrieved exams successfully!',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Define default questions for each module
const defaultQuestions = {
  module1: [
    {
      question: "Which of the following best describes environmental sustainability management at workplaces?",
      options: [
        "To manage my use of water at all times to save the environment",
        "To manage the use of energy at all times to save the environment",
        "To manage employees at all times to save the environment",
        "To gain more revenues at all times to save the environment",
        "To operate responsibly at all times to save the environment",
      ],
      correctAnswer: 4,
    },
    {
      question: "What is the essence of environmental sustainability at workplaces?",
      options: [
        "To manage the impacts of business operations to protect people",
        "To satisfy customers",
        "To gain more customers",
        "To use energy wisely",
        "To manage the impacts of business operations on the environment",
      ],
      correctAnswer: 4,
    },
    {
      question: "Where are the demands for business environmental sustainability coming from?",
      options: ["Customers", "Governments", "Communities", "of the above"],
      correctAnswer: 3,
    },
  ],
  module2: [
    {
      question: "Which of the following make up a company’s environmental issues?",
      options: [
        "Water, waste, and energy",
        "Travel, biodiversity, and energy",
        "Biodiversity, waste, and water",
        "Greenhouse gases, materials, and water",
        "All of the above",
      ],
      correctAnswer: 4,
    },
    {
      question: "How best can the risks of a company’s environmental issues be categorised?",
      options: [
        "A company’s environmental issues if unmanaged will negatively affect its stakeholders only",
        "A company’s environmental issues if unmanaged will negatively affect its immediate environment only",
        "A company’s environmental issues if unmanaged will contribute to climate change and immediate environment",
        "A company’s environmental issues if unmanaged will negatively affect its employees, reputation, bottom line, and environment",
      ],
      correctAnswer: 3,
    },
  ],
  module3: [
    {
      question: "Which of the following actions will be less effective in managing the environmental sustainability of workplaces?",
      options: [
        "Shutting down computers during lunch breaks and recycling waste",
        "Walking and cycling where possible for employee commuting",
        "Using less water at work",
        "Walking and cycling as part of employee commuting, shutting down computers after working hours, and recycling waste",
      ],
      correctAnswer: 2,
    },
    {
      question: "What best describes the benefits of managing environmental sustainability at workplaces?",
      options: [
        "It helps to save operating costs and develop sustainable products and services for customers for improved profitability",
        "It helps to improve revenues and ensure job security",
        "It helps to save energy and reduce skyrocketing energy bills",
        "It helps to reduce greenhouse gas emissions, save costs, and satisfy stakeholders' sustainability concerns",
      ],
      correctAnswer: 3,
    },
  ],
};

// Function to insert default questions
exports.insertDefaultQuestions = async (req, res) => {
  try {
    // Loop through each module and insert default questions
    for (const [moduleKey, questions] of Object.entries(defaultQuestions)) {
      // Find the course that contains the modules
      const course = await Course.findOne({ 'modules.module_title': `Module ${moduleKey.slice(-1)}` });
      if (!course) {
        return res.status(404).json({ message: `Course with Module ${moduleKey.slice(-1)} not found.` });
      }

      // Find the module within the course
      const module = course.modules.find(m => m.module_title === `Module ${moduleKey.slice(-1)}`);
      if (!module) {
        return res.status(404).json({ message: `Module ${moduleKey.slice(-1)} not found in the course.` });
      }

      // Insert each question into the Exam collection
      for (const question of questions) {
        const newExam = new Exam({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          module: module._id, // Associate exam with module
        });
        await newExam.save();
      }
    }
    res.status(201).json({ message: 'Default questions inserted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};