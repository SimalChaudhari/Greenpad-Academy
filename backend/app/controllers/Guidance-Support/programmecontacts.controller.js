const db = require("../../models");

const ProgrammeContacts = db.ProgrammeContacts;

// Get Profile By Id

exports.get = async (req, res) => {
    try {  
  
      const programmecontacts = await ProgrammeContacts.find({
      });
  
      res.status(200).json({
        data: programmecontacts,
        message: 'Retrieved ProgrammeContacts Details Successfully!',
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
