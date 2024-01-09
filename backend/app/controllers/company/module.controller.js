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

// Function to generate unique URLs for uploaded images
function generateUniqueURL(imageName) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `/${timestamp}_${randomString}_${imageName}`;
}

// Function to process the HTML content and update image links
function processHTMLContent(htmlContent) {
    try {
        const uploadFolder = path.join(__dirname, '../../../uploads/modules');
        const $ = cheerio.load(htmlContent);
        const base64Images = [];

        $('img[src^="data:image/"]').each((index, element) => {
            const base64Data = $(element).attr('src').replace(/^data:image\/\w+;base64,/, '');
            base64Images.push(base64Data);

            const imageName = `image_${index + 1}.png`;
            const imageURL = generateUniqueURL(imageName);
            const imagePath = path.join(uploadFolder, imageURL);

            fs.writeFileSync(imagePath, Buffer.from(base64Data, 'base64'));

            $(element).attr('src', '/uploads/modules' + imageURL);
        });

        return $.html();

    } catch (error) {
        return error;
    }
}