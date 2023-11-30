const landingPage = (req, res) => {
  res.render("landing");
};

const loginPage = (req, res) => {
  res.render("login");
};

const signupPage = (req, res) => {
  res.render("signup");
};
const taskPage = (req, res) => {
  res.render("index");
};
const editPage = (req, res) => {
  res.render("task");
};
const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
module.exports = {
  landingPage,
  loginPage,
  signupPage,
  taskPage,
  logout,
  editPage,
};
