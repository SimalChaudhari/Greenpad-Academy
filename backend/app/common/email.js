const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { mail_email, mail_password, test_email } = require("../config/auth.config");

const sendEmail = (data) => {
    // Function for sending an email via Gmail SMTP server with provided credentials and message details
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: mail_email,
            pass: mail_password,
        },
    });

    // Read the HTML template file
    const templatePath = path.join(__dirname, 'email_templates', 'reset_password_email.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders in the template with actual values
    const html = template.replace('{{RESET_PASSWORD_LINK}}', data.resetLink);

    // Define the email options
    const mailOptions = {
        from: test_email,
        to: [data.email],
        subject: 'Reset Password',
        html: html,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


const sendEmailForCompanyCreate = (data) => {
    // Create a company
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: mail_email,
            pass: mail_password,
        },
    });

    // Read the HTML template file
    const templatePath = path.join(__dirname, 'email_templates', 'create_company_email.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders in the template with actual values
    const html = template
        .replace('{{EMAIL}}', data.email)
        .replace('{{PASSWORD}}', data.password);

    // Define the email options
    const mailOptions = {
        from: test_email,
        to: [data.email],
        subject: 'Welcome to Greenpad-Academy',
        html: html,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

const sendEmailForEmployeeCreate = (data) => {
    // Create a company
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: mail_email,
            pass: mail_password,
        },
    });

    // Read the HTML template file
    const templatePath = path.join(__dirname, 'email_templates', 'create_company_email.html');
    const template = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders in the template with actual values
    const html = template
        .replace('{{EMAIL}}', data.email)
        .replace('{{PASSWORD}}', data.password);

    // Define the email options
    const mailOptions = {
        from: test_email,
        to: [data.email],
        subject: 'Welcome to Greenpad-Academy',
        html: html,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


module.exports = { sendEmail, sendEmailForCompanyCreate, sendEmailForEmployeeCreate };
