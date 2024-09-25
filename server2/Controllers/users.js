// สร้างผู้ใช้ใหม่
exports.create = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // ตรวจสอบข้อมูลที่เข้ามา
    const  {formData } = req.body;
    // ตรวจสอบว่ามี formData และข้อมูลที่จำเป็นครบถ้วน
    if (!formData) {
      return res.status(400).json({ message: "formData1 is required" });
    }

    const { name, age, email } = formData;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // ใช้ข้อมูลจาก formData ในการเพิ่มผู้ใช้ใหม่
    const [result] = await req.dbConnection.execute(
      "INSERT INTO users (name, age, email) VALUES (?, ?, ?)",
      [name, age, email]
    );
    const userId = result.insertId;

    // ส่ง response กลับไปเมื่อทำงานสำเร็จ
    return res.status(201).json({
      message: "New user successfully created",
      userId: userId,
      formData: formData,
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    console.log("Request Body for update:", req.body); // ตรวจสอบข้อมูลที่เข้ามา
    // ดึง param id จาก URL
    const { id } = req.params;

    // รับข้อมูล JSON object มาจาก frontend
    const { formData } = req.body;

    // ตรวจสอบว่ามีข้อมูลครบหรือไม่
    if (!formData.name || !formData.age || !formData.email) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    // อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล
    const [result] = await req.dbConnection.execute(
      "UPDATE users SET name=?, age=?, email=? WHERE id = ?",
      [formData.name, formData.age, formData.email, id]
    );

    // ดึงข้อมูลผู้ใช้ที่อัปเดตแล้วกลับมา
    const [updatedUser] = await req.dbConnection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    // ส่งข้อมูลที่อัปเดตกลับไปยัง frontend
    return res.status(200).json({
      message: "อัปเดตข้อมูลผู้ใช้สำเร็จ",
      formData: updatedUser[0],  // ส่งข้อมูลผู้ใช้ที่อัปเดตกลับไป
    });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" }); // ส่งข้อความ error
  }
};

// ดู user ทั้งหมด
exports.list = async (req, res) => {
  try {
    const [result] = await req.dbConnection.execute("SELECT * FROM users");

    // ส่ง response กลับไปพร้อมข้อมูลผู้ใช้ในรูปแบบที่ frontend ต้องการ
    return res.status(200).json({
      message: "User retrieved successfully",
      listAllUser: result, // ปรับการส่งข้อมูลให้อยู่ใน listAllUser
    });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    // ดึง param id จาก URL
    const id  = req.params.id;

    // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
    const [userCheck] = await req.dbConnection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    // ถ้าหาผู้ใช้ไม่เจอ ส่งสถานะ 404 พร้อมข้อความ
    if (userCheck.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ลบผู้ใช้
    const [results] = await req.dbConnection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    // ถ้าลบสำเร็จ ส่งสถานะ 200 พร้อมข้อความ
    return res.status(200).json({ message: "User deleted successfullyyyyyyyyy" });
  } catch (err) {
    console.log("Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};






// //Delete users ด้วย id
// ดู user ด้วยการค้นหา id
// exports.read = async (req, res) => {
//   try {
//     const id = req.params.id;

//     // ใช้ await กับ connection ในการทำ query เพื่อตรวจสอบว่าผู้ใช้มีอยู่จริงหรือไม่
//     const [result] = await req.dbConnection.execute(
//       "SELECT * FROM users WHERE id = ?",
//       [id]
//     );

//     // ถ้าไม่มีข้อมูลที่ตรงกับ id ให้ส่งสถานะ 404 (Not Found)
//     if (result.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // ส่ง response กลับไปพร้อมข้อมูลผู้ใช้
//     return res.status(200).json({
//       message: "User retrieved successfully",
//       data: result[0], // ดึงผู้ใช้จากผลลัพธ์
//     });
//   } catch (err) {
//     console.log("Error: ", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
