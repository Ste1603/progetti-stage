//modulo con le funzioni per inviare le email
const nodemailer = require("nodemailer"); //serve solo per usaere ethereal
const sgMail = require("@sendgrid/mail");

//!questo codice invia email con ethereal (fittizio)
/*
const sendEmail = async (req, res) => {
    const testAccount = await nodemailer.createTestAccount();

    //*nella realtà questi valori andrebbero settati nel .env
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'nichole.sanford@ethereal.email',
            pass: 'zhnaDN4F7FyCGSJRHd'
        }
    });

    //*ethereal permette di inviare email fittizie per testare il codice 
    let info = await transporter.sendMail({
        from: '"Stefano Riva" <stefanoRiva@gmail.com>'
        ,
        to: 'nichole.sanford@ethereal.email',
        subject: 'Hello',
        html: '<h2>Sending email with Node.js</h2>',
    });

    res.status(200).jsonq(info);
};*/

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "ste2003r@gmail.com", // Change to your recipient
    from: "psnlogin41@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  const info = await sgMail.send(msg);
  res.status(200).json(info);
  //!l'ha inviata nello spam
};

module.exports = sendEmail;
