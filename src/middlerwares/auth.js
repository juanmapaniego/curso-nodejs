const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } else {
      throw {
        code: 403,
        status: "ACCESS_DENIED",
        message: "Missing header token"
      };
      /* res
        .status(403)
        .json({ status: "ACCESS_DENIED", message: "Missin header token" }); */
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ status: error.status || "ERROR", message: error.message });
  }
};

module.exports = { isAuth };
