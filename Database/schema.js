import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    requirde: true,
  },

  password: {
    type: String,
    required: true,
  },
});
// JWT TOKEN
userSchema.methods.createToken = function () {
  return Jwt.sign({ id: this._id }, process.env.JWT_SECREAT, {
    expiresIn: 4,
  });
};

var Schema = new mongoose.model("Schema", userSchema);
export default Schema;
