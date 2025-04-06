// twilioServer.js
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = "ACa9b331c3964c172337d0ed8bd5626c0e";
const authToken = "7ba9a1161f0d97933c3a3b0da520d652";
const twilioPhone = 18504090217;

const client = twilio(accountSid, authToken);

app.post("/send-otp", async (req, res) => {
  const { phone, otp } = req.body;
  try {
    await client.messages.create({
      body: `🔐 Your OTP is: ${otp}`,
      from: twilioPhone,
      to: `+919567270587`,
    });
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
