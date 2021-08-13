const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { addUser, getUserByName, getUserById, addOffer } = require("./db");
const { secert } = require("./token.json");

const app = express();
app.use(cors({ origin: true, credentials: true }));
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
  res.cookie("jwt", token, {
    maxAge: getTokenAge() * 1000,
    sameSite: true,
    secure: true,
    httpOnly: true,
  });
  res.status(201).json({
    result: `User has succesfully register with the username: ${username}`,
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByName(username);
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        maxAge: getTokenAge() * 1000,
        sameSite: true,
        secure: true,
        httpOnly: true,
      });
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

const authenticate = async (req, res, next = null) => {
  try {
    const token = req.cookies["jwt"];
    const auth = jwt.verify(token, secert);
    const user = await getUserById(auth.id);

    if (user) {
      if (next) {
        next();
        return;
      }
      res.status(201).json({
        response: "User is authenticated",
      });
    }
  } catch (err) {
    res.status(400).json({
      response: "User is unauthenticated",
    });
  }
};

app.get("/authenticate", async (req, res) => {
  authenticate(req, res);
});

app.use(async (req, res, next) => {
  authenticate(req, res, next);
});

app.post("/addOffer", async (req, res) => {
  try {
    const { offer } = req.body;
    const result = await addOffer(offer);
    if (result.error) {
      res.status(400).json({
        message: "Error has occured",
        error: result.error,
      });
      return;
    }
    res.status(201).json({
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error has occured",
      error,
    });
  }
});

app.listen(5000);
