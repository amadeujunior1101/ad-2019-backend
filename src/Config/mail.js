const mailer = require("nodemailer");
require("dotenv/config");

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};

const transporter = mailer.createTransport(config);

module.exports = transporter;
