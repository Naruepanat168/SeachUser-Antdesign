const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // ชื่อเป็นค่าบังคับ
  
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true, // อีเมลเป็นค่าบังคับ
    }
    
  },
  { timestamps: true }
)

module.exports = mongoose.model("user", userSchema);
