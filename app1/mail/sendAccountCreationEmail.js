const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const registerEmail = async ({ name, emails, last }) => {
  try {
    const requiredPath = path.join(__dirname, "../view/AccountCreated.ejs");
    const data = await ejs.renderFile(requiredPath, {
      name,
      last,
    });
    const msg = {
      to: emails,
      from: "hemantsingh.eminence@gmail.com", // Use the email address or domain you verified above
      subject: "Account Activated",
      html: data,
    };
    // await transporter.sendMail(msg);
    //ES6
    await sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const loginEmail = async ({ name, emails, last }) => {
  try {
    const requiredPath = path.join(__dirname, "../view/Login.ejs");
    const data = await ejs.renderFile(requiredPath, {
      name,
      last,
    });
    const msg = {
      to: emails,
      from: "hemantsingh.eminence@gmail.com", // Use the email address or domain you verified above
      subject: "Welcome Back",
      html: data,
    };
    // await transporter.sendMail(msg);
    //ES6
    await sgMail.send(msg).then(
      () => {},
      (error) => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerEmail,
  loginEmail,
};
