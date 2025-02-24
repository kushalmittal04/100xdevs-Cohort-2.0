const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://kushalmittal04:ERNyRHEzhRSVhgLq@cluster0.a82ty.mongodb.net/test",
);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  mailId: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

const user = new User({
  name: "Kushal Mittal",
  username: "kushalmittal04",
  mailId: "rdlnk@example.com",
  password: "ERNyRHEzhRSVhgLq",
});
user.save();
