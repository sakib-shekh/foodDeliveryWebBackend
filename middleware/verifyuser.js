const jwt = require("jsonwebtoken");
const JWTsecret = process.env.SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    res.status(401).send({ error: "Invalid token" });
  }
  try {
    const data = jwt.verify(token, JWTsecret);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: err });
  }
};
module.exports = fetchuser;
