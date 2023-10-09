const axios = require("axios");

//getting the access token
const createToken = async (req, res, next) => {
  const secret = "YvYjlXsgRtzt9fgj";
  const consumer = "GpLNOjQIEqvlQ35hFQwjoWjYh3RqdVdq";
  const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

  try {
    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    token = response.data.access_token;
    console.log(response.data);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json(err.message);
  }
};

//stk push logic and functionality
const stkPush = async (req, res) => {
  const shortCode = 174379;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
  const passkey =
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);

  const password = new Buffer.from(shortCode + passkey + timestamp).toString(
    "base64"
  );

  const data = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: 174379,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://domainyangu.com/njia",
    AccountReference: "Mpesa Test",
    TransactionDesc: "Testing stk push",
  };

  //post request for the stk push
  await axios
    .post(url, data, {
      headers: { authorization: `Bearer ${token}` },
    })
    .then((data) => {
      console.log(data);
      res.status(200).json(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err.message);
    });
};

module.exports = { createToken, stkPush };
