const { PROJECT_URL } = process.env;

const verifyEmail = (email, verificationCode, subject = 'Verify email') => {
  return {
    to: email,
    subject: subject,
    html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
  };
};

module.exports = verifyEmail;
