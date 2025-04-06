// twilioServer.js
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = "AC4b192f3b6b42d451f639540ad3c47c1d";
const authToken = "ad58e481b4e74ea650fa8dc7de9a642f";
const twilioPhone = 16206340511;

const client = twilio(accountSid, authToken);

app.post("/send-otp", async (req, res) => {
  const { phone, otp } = req.body;
  try {
    await client.messages.create({
      body: `🔐 Your OTP is: ${otp}`,
      from: twilioPhone,
      to: `+919495860071`,
    });
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
