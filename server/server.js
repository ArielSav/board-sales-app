const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { addUser, getUser } = require("./db");
const { secert } = require("./token.json");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Change the first number to control the days the token is vaild
const getTokenAge = () => (age = 10 * 24 * 60 * 60);

const createToken = (id) => {
  return jwt.sign({ id }, secert, {
    expiresIn: getTokenAge(),
  });
};

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(password, salt);
  const result = await addUser(username, hashedPass);
  if (result.error) {
    res.status(400).json({
      response: `error occured adding username ${username}`,
      error: result.error,
    });
    return;
  }
  const token = createToken(result.id);
  res.cookie("jwt", token, { httpOnly: true, maxAge: getTokenAge() * 1000 });
  res.status(201).json({
    result: `User has succesfully register with the username: ${username}`,
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUser(username);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      res.status(201).json({
        auth,
      });
      return;
    }
    res.status(400).json({
      auth,
      response: "Password incorrect",
    });
  }
});

app.listen(5000);
