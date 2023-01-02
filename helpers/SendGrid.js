import sgMail from "@sendgrid/mail";

import dotenv from "dotenv";
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API);
export const sendEmail = (req) => {
  const msg = {
    to: req.body.email,
    from: "hiba.al-aani@digitalcareerinstitute.org",
    subjet: req.body.subjet,
    html: "<h1>hello there</h1>",
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("your email has been sent successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
