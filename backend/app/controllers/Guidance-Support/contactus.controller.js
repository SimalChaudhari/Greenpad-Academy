const db = require("../../models");

const Contactus = db.Contactus;

// Get Profile By Id

exports.get = async (req, res) => {
    try {  
  
      const contactus = await Contactus.find({
      });
  
      res.status(200).json({
        data: contactus,
        message: 'Retrieved Contactus Details Successfully!',
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };


// Create a new contact
exports.create = async (req, res) => {
  try {
    const { query, type } = req.body;
    const user_id = req.userId;
    
    // Create a new contact document
    const newContact = new Contactus({
      query,
      type,
      user_id,
    });

    // Save the new contact to the database
    const savedContact = await newContact.save();

    res.status(201).json({
      data: savedContact,
      message: 'Contactus Details Created Successfully!',
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};