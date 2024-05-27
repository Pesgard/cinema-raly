import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'raly.cinemas.mty@gmail.com',
    pass: 'wyuzmvindnlbgqke',
  },
});

transporter.verify(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export default transporter;