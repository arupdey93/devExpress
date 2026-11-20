const adminAuth = (req, res, next) => {
  console.log("Admin middleware executed");
  const token = "sadasda";
  const isAuthenticated = token === "sadasda";
  if (!isAuthenticated) {
    return res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
