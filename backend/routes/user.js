const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//create a user

router.post("/", async (req, res) => {
  // generate password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create user
  const newUser = new User({
    userName: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//user login

router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.username });
    !user && res.status(400).json("no user found with this user name");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("password don't match");

    res.status(200).json({ _id: user._id, username: user.userName });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
