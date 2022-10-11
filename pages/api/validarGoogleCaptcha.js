import axios from "axios";
const handler = (req, res) => {
  try {
    let gRecaptchaToken = req.body.gReCaptchaToken;

    const body = `secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`;

    axios
      .post("https://www.google.com/recaptcha/api/siteverify", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((reCaptchaRes) => {
        console.log("Google reCaptcha verification completed "+ reCaptchaRes?.data?.score );
      
        if (reCaptchaRes?.data?.score > 0.5) {
          // Save data to the database from here
          res.status(200).json({
            status: "success",
            message: "You are a human",
          });
        } else {
          res.status(200).json({
            status: "failure",
            message: "You are a robot",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Google ReCaptcha verification failure",
    });
  }
};

export default handler;
