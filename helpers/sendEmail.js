const Mailjet = require("node-mailjet");

const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

const mailjet = new Mailjet({
  apiKey: MJ_APIKEY_PUBLIC,
  apiSecret: MJ_APIKEY_PRIVATE,
});

const sendEmail = async (data) => {
  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: MJ_SENDER_EMAIL,
          Name: "My APP",
        },
        To: [
          {
            Email: data.to,
            Name: "New User",
          },
        ],
        Subject: data.subject,
        TextPart: "Please follow the link to verify your email",
        HTMLPart: data.html,
      },
    ],
  });
  return true;
};

module.exports = sendEmail;
