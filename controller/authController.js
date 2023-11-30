const UnauthenticatedError = require("../errors/unauthenticated");
const User = require("../model/User");

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = await user.createJwt();
  res.cookie("jwt", token, { htppOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user._id, email: user.email });
};

const maxAge = 1 * 24 * 60 * 60;
const signup = async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  const token = await user.createJwt();
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user._id });
};

module.exports = { login, signup };
