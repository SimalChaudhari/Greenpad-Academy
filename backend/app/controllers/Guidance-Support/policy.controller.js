const db = require("../../models");

const Policy = db.Policy;

// Get Profile By Id

exports.get = async (req, res) => {
    try {  
  
      const policy = await Policy.find({
      });
  
      res.status(200).json({
        data: policy,
        message: 'Retrieved Policy Details Successfully!',
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
