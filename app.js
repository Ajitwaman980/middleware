const express = require("express");
const port = 3000;
const app = express();
const adminMiddleware = require("./middleware");
const ejs = require("ejs");
app.use(adminMiddleware);
app.use(express.static("public"));
// this is simple middleware
app.use((req, res, next) => {
  console.log("this is middleware begin");

  next();
});
// logger
app.use((req, res, next) => {
  // this is crate data and time using Date.now
  req.time = new Date(Date.now()).toString();
  console.log("date and time is ", req.time);
  console.log("path and method ", req.path, req.method);
  next();
});
// simple function
// const admin = (req, res, next) => {
//   let { query } = req.query;
//   console.log("this is ur query ", query);

//   if (query === "allow" || query === "Allow") {
//     next();
//   } else {
//     res.send("ACCESS DENIED!");
//   }
// };
// used the adminMiddleware
// http://localhost:3000/admin?query=allow run this
app.get("/admin", adminMiddleware, async (req, res) => {
  try {
    const response = await fetch("https://dummyjson.com/users/2");
    const data = await response.json();
    // console.log(data);
    res.render("data.ejs", { data });
    // console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
app.get("/", (req, res) => {
  res.send("this is home page ");
  console.log("this is middleware ended");
});
app.get("/about", (req, res) => {
  res.send("this is about page ");
  console.log("this is middleware ended");
});

app.listen(port, () => {
  console.log(`this is port ${port}`);
});
