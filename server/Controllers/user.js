const User = require("../Model/user");


// getUserByID  User Controller
exports.getUserById = async (req, res) => {
  try {
    // ดึง userId จาก params ใน URL
    const userId = req.params.userId;

    // ค้นหาผู้ใช้ตาม userId
    const user = await User.findById(userId).exec();

    // ถ้าหาผู้ใช้ไม่เจอ
    if (!user) {
      return res.status(404).send("หาผู้ใช้ไม่เจอ");
    }

    // ส่งรายละเอียดของผู้ใช้กลับไป
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};


// List  User Controller
exports.list = async (req, res) => {
  try {
    console.log('getทำงาน');
    
    const listAllUser = await User.find({})
    
    res.json({listAllUser});


  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};


// Create User Controller
exports.create = async (req, res) => {
  try {
    const {formData} = req.body;
    // สร้างผู้ใช้ใหม่
    const user = new User({
      name:formData.name,
      age:formData.age,
      email:formData.email,
      
    });

    console.log(user);
    await user.save(); // บันทึกผู้ใช้ลงฐานข้อมูล
    res.status(200).json(user); // ส่งข้อมูลผู้ใช้ที่ถูกสร้างกลับไป
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// UpdateUserByID User Controller
exports.updateUserById = async (req, res) => {
  try {
    // ดึง userId จาก params ใน URL
    const userId = req.params.userId;

    // รับข้อมูลที่ต้องการอัปเดตจาก request body
    const { name, age, email } = req.body;

    // ตรวจสอบว่าอีเมลซ้ำหรือไม่ ยกเว้นอีเมลของผู้ใช้ที่กำลังอัปเดตอยู่
    const existingUser = await User.findOne({ email, _id: { $ne: userId } }).exec();
    if (existingUser) {
      return res.status(400).send("มีอีเมลอยุ่ในระบบแล้ว");
    }

    // ค้นหาและอัปเดตข้อมูลผู้ใช้
    const updatedUser = await User.findByIdAndUpdate(
      userId, // หาโดย userId
      { name, age, email }, // ข้อมูลที่จะอัปเดต
      { new: true, runValidators: true } // คืนข้อมูลใหม่ที่ถูกอัปเดตแล้ว
    );

    // ถ้าไม่พบผู้ใช้
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // ส่งข้อมูลผู้ใช้ที่อัปเดตกลับไป
    res.send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};


exports.deleteUserById = async (req, res) => {
  try {
    // ดึง userId จาก params ใน URL
    const userId = req.params.userId;

    // ลบผู้ใช้ตาม userId
    const deletedUser = await User.findByIdAndDelete(userId).exec();

    // ถ้าไม่พบผู้ใช้
    if (!deletedUser) {
      return res.status(404).send("ไม่พบผู้ใช้หรือถูกลบไปแล้ว");
    }

    // ถ้าลบสำเร็จ
    res.send({ success: true, message: "ลบผู้ใช้สำเร็จแล้ว" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

