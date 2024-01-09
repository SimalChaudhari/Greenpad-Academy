const db = require("../models");

const Note = db.note;

// * Add Note

exports.addNote = (req, res) => {
  const {
    name,
    description,
    course_id,
    is_active,
    created_by,
    updated_by,
  } = req.body;

  try {
    const note = new Note({
      name,
      description,
      course_id,
      is_active,
      created_by,
      updated_by,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    note.save((err, note) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(500).json({ message: "Note already exist!" });
        } else {
          return res.status(500).json({ message: err });
        }
      }

      res.status(200).json({ message: "Note created successfully!", note });
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create the note.", error: err });
  }
};

// * Update Note

exports.updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { name, description, course_id, is_active, updated_by } =
    req.body;

  try {
    const note = await Note.findById(noteId);

    if (!note) { return res.status(404).json({ message: "Note not found." });}

    note.name = name;
    note.description = description;
    note.course_id = course_id;
    note.is_active = is_active;
    note.updated_by = updated_by;
    note.update_at = Date.now();

    await note.save();
    res.status(200).json({ message: "Note updated successfully.", note });
    //return response object with status code and success message
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).json({ message: "Note already exist!" });
    } else {
      res.status(500).json({ message: "Failed to update the note.", error: err });
    }
  }
};

// * Remove Note

exports.removeNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findById(noteId);
    if (!note) { return res.status(404).json({ message: "Note not found." }); }

    await note.remove();
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete the note.", error: err });
  }
};
