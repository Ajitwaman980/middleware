const adminMiddleware = (req, res, next) => {
  let { query } = req.query;
  console.log("this is ur query ", query);

  if (query === "allow" || query === "Allow") {
    next();
  } else {
    res.send("ACCESS DENIED!");
  }
};

module.exports = adminMiddleware;
