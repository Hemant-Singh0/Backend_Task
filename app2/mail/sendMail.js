const ejs = require("ejs");
const path = require("path");
const transporter = require("./transporter");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const registerEmail = async ({ name, emails }) => {
  try {
    const requiredPath = path.join(__dirname, "../msg/register.ejs");
    const data = await ejs.renderFile(requiredPath, {
      name,
    });
    const msg = {
      to: emails,
      from: "hemantsingh.eminence@gmail.com", // Use the email address or domain you verified above
      subject: "Thank you for joining us!!",
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

const loginEmail = async ({ name, emails }) => {
  try {
    const requiredPath = path.join(__dirname, "../msg/login.ejs");
    const data = await ejs.renderFile(requiredPath, {
      name,
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

const otpEmail = async ({ email, otpcode }) => {
  try {
    const requiredPath = path.join(__dirname, "../msg/otp.ejs");
    const data = await ejs.renderFile(requiredPath, {
      otpcode,
    });
    const msg = {
      to: email,
      from: "hemantsingh.eminence@gmail.com", // Use the email address or domain you verified above
      subject: "Forget Password",
      html: data,
    };
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

const changePasswordEmail = async ({ email }) => {
  try {
    const requiredPath = path.join(__dirname, "../msg/passwordChange.ejs");
    const data = await ejs.renderFile(requiredPath, {});
    const msg = {
      to: email,
      from: "hemantsingh.eminence@gmail.com", // Use the email address or domain you verified above
      subject: "Password Change Successfully",
      html: data,
    };
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
  otpEmail,
  changePasswordEmail,
};
