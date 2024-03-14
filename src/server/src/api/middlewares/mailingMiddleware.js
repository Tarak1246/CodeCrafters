/**
 * @file mailingMiddleware.js
 * @description Middleware for sending email notifications (consider security implications).
 * @author @Tarak1246
 * @date March 13, 2024
 * @WARNING This implementation stores sensitive credentials (email address and potentially password) directly in the code. This is a security risk! Consider using environment variables or a secure configuration store.
 */

const nodemailer = require("nodemailer");
/**
 * @description Sends a welcome email notification to a newly created admin user.
 * @param {Object} adminUser An object containing admin user details (email, firstname, password).
 * @returns {Promise<void>} Resolves after sending the email or rejects with an error.
 */
const mailingMiddleware = async (adminUser) => {
  try {
    // Create a transporter object using the provided SMTP server details
    const transporter = nodemailer.createTransport({
      host: "sample server details",
      port: 25, //your smtp port
      auth: null,
    });
    // Create a transporter object using the provided SMTP server details
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST, // Use environment variable for host
    //   port: process.env.SMTP_PORT, // Use environment variable for port
    //   auth: null,
    // });
    const mailOptions = {
      from: "tarak1246@gmail.com",
      to: adminUser.email,
      subject: "Welcome to the Admin Panel",
      text: `Dear ${adminUser.firstname},\n\nYour account has been successfully created.\n\nPassword: ${adminUser.password}\n\nBest regards,\nThe Admin Team`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // next();
  }
};

module.exports = mailingMiddleware;
