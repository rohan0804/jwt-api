const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "welcome to the api" });
});

app.post("/api/posts", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authdata) => {
    if (err) {
      res.sendStatus(403);
    } else {
      console.log(authdata);
      res.json({ message: "post created...", data: authdata });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    name: "rohan",
    email: "rohan@gmail.com"
  };
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token: token
    });
  });
});

function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearertoken = bearer[1];
    req.token = bearertoken;
    next();
  } else {
    res.sendStatus(403);
  }
  //   next();
}
app.listen(6400, () => {
  console.log("server started on port 6400");
});
