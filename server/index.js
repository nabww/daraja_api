const express = require("express");
const cors = require("cors");

const app = express();
const TokenRoute = require("./routes/token");

const port = 5000;

app.listen(port, () => {
  console.log("listening on port " + port);
});

app.get("/", (req, res) => {
  res.send("M~Pesa Payment service is in works, Let us get paid!");
});
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/token", TokenRoute);
