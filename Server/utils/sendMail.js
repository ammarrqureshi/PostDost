import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ehsanellahiofficial@gmail.com',
    pass: 'vskpsmjicxfxpoof',
  },
});
const sendMail = async (sender, receiver, subject, message, cb) => {
  const options = {
    from: sender,
    to: receiver,
    subject: subject,
    text: message,
  };
  transporter.sendMail(options, (error, info) => {
    if (error) {
      cb(error);
    } else {
      return cb();
    }
  });
};
export default sendMail;
