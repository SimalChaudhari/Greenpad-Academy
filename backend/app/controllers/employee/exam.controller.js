const db = require("../../models");

const Exams = db.Exam;

exports.getExams = async (req, res) => {
    try {  
  
      const exam = await Exams.find({
      });
  
      res.status(200).json({
        data: exam,
        message: 'Retrieved Exam Details Successfully!',
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };