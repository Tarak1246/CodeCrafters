const nodemailer = require("nodemailer");

const mailingMiddleware = async (adminUser) => {
  try {
    // Create a transporter object using the provided SMTP server details
    const transporter = nodemailer.createTransport({
      host: "sample server details",
      port: 25,//your smtp port
      auth: null
    });

    const mailOptions = {
      from: "tarak1246@gmail.com",
      to: adminUser.email,
      subject: 'Welcome to the Admin Panel',
      text: `Dear ${adminUser.firstname},\n\nYour account has been successfully created.\n\nPassword: ${adminUser.password}\n\nBest regards,\nThe Admin Team`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally{
    // next();
  }
};

module.exports = mailingMiddleware;
