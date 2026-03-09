const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  //   next();
});

UserSchema.methods.comparePassword = async function (candidatePasssword) {
  return await bcrypt.compare(candidatePasssword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
