const express = require("express");
const router = express.Router();

const {
  list,
  getUserById,
  create,
  updateUserById,
  deleteUserById,
} = require("../Controllers/user");

router.get("/user/:userId", getUserById);
router.get("/listAllUser", list);

router.post("/user", create);
router.put("/user/:userId", updateUserById);
router.delete("/user/:userId", deleteUserById);

module.exports = router;
