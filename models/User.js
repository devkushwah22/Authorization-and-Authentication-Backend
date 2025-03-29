const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // trusted ko replace karke true kar dein
  },

  email: {
    type: String,
    required: true,
    trim: true, // trusted ko replace karke true kar dein
  },

  passward: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"] // enum list ko sahi tarah se define karein
  }
});

module.exports = mongoose.model("user", userSchema);
