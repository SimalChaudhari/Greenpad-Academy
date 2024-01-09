const db = require("../../models");
const cheerio = require("cheerio");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const Course = db.Course;
const Module = db.Module;
const Description = db.Description;

// Create a new Module
exports.createModule = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, descriptions, moduleId } = req.body;
    console.log("moduleId: .....", moduleId);

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    // Find and get the modules based on moduleId matching modules._id
    const matchingModules = course.modules.filter(
      (module) => module._id.toString() === moduleId
    );
    if (matchingModules.length === 0) {
      return res.status(404).json({ message: "Module Not Found" });
    }

    // Create descriptions
    const descIds = await createDescriptions(descriptions);

    // Create the module and associate it with the course
    const newModule = await Module.create({
      title,
      descriptions: descIds,
      course: courseId,
    });

    // Add the module to the course's modules array
    // course.modules.push(newModule._id);

    matchingModules.forEach((matchingModule) => {
      matchingModule.module.push(newModule._id);
    });

    await course.save();

    // Fetch modules for the given course ID and populate 'courses' and 'descriptions' fields
    // const data = await Course.findById(courseId)
    //   .populate({
    //     path: "modules",
    //     populate: {
    //       path: "descriptions",
    //       model: "Description",
    //     },
    //   })
    //   .exec();

    const data = await Course.findById(courseId)
      .populate({
        path: "modules.module",
        populate: {
          path: "descriptions",
          model: "Description",
        },
      })
      .exec();

    if (data.modules && Array.isArray(data.modules)) {
      const moduleData = data.modules.map((module) => module.module);
      console.log("Module Data:", moduleData);
    } else {
      console.log("No modules found for the course.");
    }
    // console.log('data: ssssssssssssssssssssssss', data);

    res.status(201).json(data);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ message: "Error Creating A New Module", error });
  }
};

// Update a Module
exports.updateModule = async (req, res) => {
  try {
    const moduleId = req.params.id;
    const { title, is_active, descriptions, CourseId } = req.body;
    const courseId = CourseId;
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: "Module Not Found" });
    }

    // Update module properties
    module.title = title;
    module.is_active = is_active;
    module.descriptions = descriptions;

    // Update module descriptions based on their _id
    for (const updatedDescription of descriptions) {
      const existingDescription = module.descriptions.find(
        (desc) => desc._id.toString() === updatedDescription._id
      );

      if (existingDescription) {
        existingDescription.content = updatedDescription.content;
      }
    }

    const descIds = await updateDescriptions(descriptions);

    // Update the associated course if provided
    if (courseId) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course Not Found" });
      }
      module.course = courseId;
      module.updated_at = Date.now();
    }

    // Save the updated module
    await module.save();

    const data = await Course.findById(courseId)
      .populate({
        path: "modules.module",
        populate: {
          path: "descriptions",
          model: "Description",
        },
      })
      .exec();

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error Updating The Module", error });
  }
};

// Delete a Module
exports.deleteModule = async (req, res) => {
  try {
    const moduleId = req.params.id;
    const { CourseId, SubModuleId } = req.body;
    const courseId = CourseId;
    const submoduleId = SubModuleId;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    const module = await Module.findById(moduleId);

    if (!module) {
      return res.status(404).json({ message: "Module Not Found" });
    }

    // Delete each description associated with the module
    if (module.descriptions && module.descriptions.length > 0) {
      for (const descriptionId of module.descriptions) {
        const description1 = await Description.findById(descriptionId);

        const $ = cheerio.load(description1.content);

        // Find all image tags in the HTML content
        $("img").each((index, element) => {
          const src = $(element).attr("src");
          const parts = src.split("/");
          const imageName = parts[parts.length - 1];

          // Construct the correct file path
          const imagePath = path.join(
            __dirname.replace("\\app\\controllers\\admin", ""),
            "uploads",
            "modules",
            imageName
          );

          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); // Delete the old image file
          } else {
            console.log(`File Not Found At Path: ${imagePath}`);
          }
        });

        await Description.findByIdAndDelete(descriptionId);
      }
    }

    // Remove the module from all courses that reference it
    // await Course.updateMany(
    //   { modules: moduleId },
    //   { $pull: { modules: moduleId } }
    // );

    await Course.updateMany(
      { "modules.module": moduleId },
      { $pull: { "modules.$.module": moduleId } }
    );
    // Delete the module
    await module.remove();

    res.json({ message: "Module Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting The Module", error });
  }
};

// Get a list of modules for a specific course
exports.getModuleList = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    // Fetch modules for the given course ID and populate 'courses' and 'descriptions' fields
    const data = await Course.findById(courseId)
      .populate({
        path: "modules.module",
        populate: {
          path: "descriptions",
          model: "Description",
        },
      })
      .exec();

    // if (data.modules && Array.isArray(data.modules)) {
    //   const moduleData = data.modules.map((module) => module.module);
    //   console.log('Module Data:', moduleData);
    // } else {
    //   console.log('No modules found for the course.');
    // }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error Retrieving Modules", error });
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
      descriptions: description.content,
    };

    if (!module) {
      return res.status(404).json({ message: "Module Not Found" });
    }

    res.json(module);
  } catch (error) {
    res.status(500).json({ message: "Error Retrieving The Module", error });
  }
};

// Function to generate unique URLs for uploaded images
function generateUniqueURL(imageName) {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(2, 15);
  return `/${timestamp}_${randomString}_${imageName}`;
}

// Function to process the HTML content and update image links
// function processHTMLContent(htmlContent) {
function processHTMLContent(descriptions) {
  try {
    const uploadFolder = path.join(__dirname, "../../../uploads/modules");
    const $ = cheerio.load(descriptions);
    const base64Images = [];

    $('img[src^="data:image/"]').each((index, element) => {
      const base64Data = $(element)
        .attr("src")
        .replace(/^data:image\/\w+;base64,/, "");
      base64Images.push(base64Data);

      const imageName = `image_${index + 1}.png`;
      const imageURL = generateUniqueURL(imageName);
      const imagePath = path.join(uploadFolder, imageURL);

      fs.writeFileSync(imagePath, Buffer.from(base64Data, "base64"));

      $(element).attr(
        "src",
        process.env.BACKEND_ORIGIN + "/uploads/modules" + imageURL
      );
    });
    return $.html();
  } catch (error) {
    return error;
  }
}

async function createDescriptions(descriptions) {
  let descArr = [];

  // Use map to create an array of promises
  const promises = descriptions.map(async (element) => {
    const updatedHTMLContent = await processHTMLContent(element.content);

    const createdDescriptions = await Description.create({
      content: updatedHTMLContent,
    });
    descArr.push(createdDescriptions._id);
  });

  // Wait for all promises to resolve using Promise.all
  await Promise.all(promises);

  // Sort the description IDs in ascending order
  descArr.sort();

  return descArr;
}

async function updateDescriptions(descriptions) {
  let descArr = [];

  // Use map to create an array of promises
  const promises = descriptions.map(async (element) => {
    const updatedHTMLContent = await processHTMLContent(element.content);

    // Find the existing description by its _id
    const existingDescription = await Description.findById(element._id);

    if (existingDescription) {
      // Update the content of the existing description
      existingDescription.content = updatedHTMLContent;
      existingDescription.updated_at = Date.now();

      // Save the updated description
      await existingDescription.save();
      descArr.push(existingDescription._id);
    } else {
      // Handle the case where the description does not exist
      console.error("Description Not Found");
    }
  });

  // Wait for all promises to resolve using Promise.all
  await Promise.all(promises);

  // Sort the description IDs in ascending order
  descArr.sort();

  return descArr;
}
