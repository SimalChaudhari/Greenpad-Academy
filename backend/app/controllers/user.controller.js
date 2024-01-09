const bcrypt = require("bcryptjs");
const readXlsxFile = require('read-excel-file/node')
const { User } = require("../models");
const ROLES = require("../config/roles.js");
// const User = db.user;
// const Role = db.role;

// * Get All Companies

exports.getAllCompanies = async (req, res) => {
    // let companyId = null;

    // await Role.find({ name: 'company' }, async (err, role) => {

        // if (err) { return res.status(500).json({ message: err }); }
        // companyId = await role[0]._id;

    // });
    const totalRecords = await User.count({ role: ROLES.COMPANY, is_deleted: false }).exec()

    User.find({ role: ROLES.COMPANY, is_deleted: false }, (err, companies) => {

        if (err) { return res.status(500).json({ message: err }); }
        res.status(200).json({ data: companies, totalRecords, message: 'Get Companies details!' });

    })
}

// * Add Employee Using Sheet

exports.addEmployeesUsingSheet = async (req, res) => {
    try {
        const created_by = req.userId;
        const file = req.files.file
        const schema = {
            'Employee Name': { prop: 'employee_name', type: String },
            'Job Title': { prop: 'job_title', type: String },
            'Department': { prop: 'department', type: String },
            'Email': { prop: 'email', type: String },
            'Password': { prop: 'password', type: String },
            'Address': { prop: 'address', type: String },
            'Country': { prop: 'country', type: String },
            'Pincode': { prop: 'post_code', type: String },
        }
        await readXlsxFile(file.data, { schema, sheet: 'Sheet1' }).then(async (item) => {
            for (let employee of item.rows) {
                employee.created_by = created_by
                employee.first_name = employee?.employee_name.split(' ')[0]
                employee.last_name = employee?.employee_name.split(' ')[1]
                delete employee.employee_name
                await addEmployee(employee)
            }
        })

        return res.status(200).json({ message: "Sheet upload!" });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

// * Get All Employees

exports.getAllEmployees = async (req, res) => {

    const companyId = req.userId;

    const totalRecords = await User.count({ created_by: companyId, is_deleted: false }).exec()
    
            User.find({ created_by: companyId, is_deleted: false }, (err, employees) => {
    
                if (err) { return res.status(500).json({ message: err }); }
                res.status(200).json({ data: employees, totalRecords, message: 'Get employees details!' });
    
            })

};

// * Get Profile By Id

exports.getProfileById = async (req, res) => {
    const profileId = req.params.id;

    User.findById(profileId, (err, user) => {

        if (err) { return res.status(500).json({ message: err }); }

        if (user) {
            res.status(200).json({ data: user, message: 'Get profile details!' });
        } else {
            return res.status(404).json({ message: "User Not found." });
        }
    }
    );

};

// * Update Profile

exports.updateProfile = async (req, res) => {
    const profileId = req.params.id;
    const { first_name, last_name, job_title, department, address, country, post_code, updated_by } = req.body;

    try {
        const user = await User.find({ _id: profileId, is_deleted: false });
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        user[0].first_name = first_name;
        user[0].last_name = last_name;
        user[0].job_title = job_title;
        user[0].department = department;
        user[0].address = address;
        user[0].country = country;
        user[0].post_code = post_code;
        user[0].updated_by = updated_by;
        user[0].update_at = Date.now();

        await user[0].save();
        res.status(200).json({ message: "User updated successfully.", user });

        //return response object with status code and success message
    } catch (err) {
        res.status(500).json({ message: "Failed to update the user.", error: err });
    }
};

// * Remove Profile

exports.removeProfile = async (req, res) => {
    const profileId = req.params.id;

    try {
        const user = await User.findById(profileId);

        if (!user) { return res.status(404).json({ message: "User not found." }); }

        user.is_deleted = true;
        user.update_at = Date.now();

        await user.save();
        res.status(200).json({ message: "User deleted successfully.", user });

        //return response object with status code and success message
    } catch (err) {
        res.status(500).json({ message: "Failed to update the user.", error: err });
    }
};

// * Add Employee

const addEmployee = (employee) => {

    const { first_name, last_name, job_title, department, email, password, profession, address, country, post_code, created_by } = employee

    User.findOne({ email }).exec((err, userData) => {

        if (userData) {
            console.log('Error', `Failed! ${email} is already in use!`);
            return
        }

        const user = new User({ first_name, last_name, job_title, department, email, password: bcrypt.hashSync(password, 8), profession, address, country, post_code, created_by });

        user.save((err, user) => {
            console.log('Error', err);

            Role.find({ name: 'employee' }, (err, roles) => {

                console.log('Error', err);
                user.role = roles.map((role) => role._id);

                user.save((err) => {
                    console.log('Error', err);
                    console.log('Success', first_name, last_name + " was registered successfully!");
                });
            }
            );
        });
    });
}