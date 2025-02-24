// decode verify generate
const jwt = require("jsonwebtoken");
const jwtpassword = "secret";

const value = {
  name: "Kushal Mittal",
  age: 21,
  accountNo: "1234567890",
  username: "kushalmittal@example.com",
  // password: "kush@123"
};

//  Generating a token (jwt)
const token = jwt.sign(value, jwtpassword);
console.log(token);

const verifiedVaue = jwt.verify(token, jwtpassword);
console.log(verifiedVaue);