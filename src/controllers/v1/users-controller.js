const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../../mongo/models/user.js");

const expiresIn = 60 * 30;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      //
      const isOk = bcrypt.compareSync(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.json({ status: "OK", data: { token, expiresIn } });
      } else {
        res.status(403).json({
          status: "Error",
          message: "Password invalid"
        });
      }
    } else {
      res.status(401).json({
        status: "User not found",
        message: "No existe el usuario vinculado al email"
      });
    }
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, data } = req.body;
    const hash = await bcrypt.hash(password, 15);

    /*     await Users.create({
      username,
      email,
      data,
      password: hash
    }); */
    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;
    await user.save();

    res.json({ status: "OK", message: "User created" });
  } catch (error) {
    if (error.code && error.code == 11000) {
      res
        .status(400)
        .json({ status: "Duplicated_values", message: error.keyValue });
      return;
    }
    res.status(500).json({ status: "Error", message: error.message });
  }
};

const deleteUser = (req, res) => {};

const getUsers = (req, res) => {};

const updateUser = async (req, res) => {
  try {
    const { username, email, data, userId } = req.body;
    await Users.findByIdAndUpdate(userId, {
      username,
      email,
      data
    });
    res.json({ status: "OK", message: "User updated" });
  } catch (error) {
    if (error.code && error.code == 11000) {
      res
        .status(400)
        .json({ status: "Duplicated_values", message: error.keyValue });
      return;
    }
    console.log("Error updating user: ", error);
    res.status(500).json({ status: "ERROR", message: e.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login
};
