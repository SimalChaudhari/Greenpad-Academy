const db = require("../../models");
const cheerio = require('cheerio');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

const Course = db.Course;
const Module = db.Module;
const Description = db.Description;

// Get a list of modules for a specific course
exports.getModuleList = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course Not Found' });
        }

        // Fetch modules for the given course ID and populate 'courses' and 'descriptions' fields
        const data = await Course.findById(courseId)
            .populate({
                path: 'modules',
                populate: {
                    path: 'descriptions',
                    model: 'Description',
                },
            })
            .exec();

        res.json(data);

    } catch (error) {
        res.status(500).json({ message: 'Error Retrieving Modules', error });
    }
};

// Get a Module by ID
exports.getModuleById = async (req, res) => {
    try {
        const moduleId = req.params.id;

        let module = await Module.findById(moduleId);
        const descriptionId = module.descriptions[0];

        const description = await Description.findById(descriptionId);

        // module.descriptions = description.content;
        module = {
            ...module,
            descriptions: description.content
        }

        if (!module) {
            return res.status(404).json({ message: "Module Not Found" });
        }

        res.json(module);
    } catch (error) {
        res.status(500).json({ message: "Error Retrieving The Module", error });
    }
}
