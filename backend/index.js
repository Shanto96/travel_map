const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

const connection = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then(()=>console.log("DB Connected"))
    .catch((error) => console.log({ error }));
};
connection();

app.listen(8900, () => {
  console.log(
    "Backend Server Connected .. . ... .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .."
  );
});
