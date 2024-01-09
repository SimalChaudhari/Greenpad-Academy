const db = require("../../models");

const Setting = db.Setting;

// Get Settings

exports.getSetting = async (req, res) => {
    try {  
  
      const setting = await Setting.find({
      });
  
      res.status(200).json({
        data: setting,
        message: 'Retrieved Settings Details Successfully!',
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
