const express = require("express");
const router = express.Router();

const { list, create ,remove ,update} = require("../Controllers/users");
// ,read,  update, remove
//   // middleware
//   const {auth} = require('../Middleware/auth')

// router.get("/user/:id", read);
router.get("/user", list);
router.post("/user", create);
router.put("/user/:id", update);
router.delete("/user/:id", remove);



module.exports = router;
