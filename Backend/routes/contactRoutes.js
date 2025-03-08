const express = require("express");
const router = express.Router();
const { contactFormHandler } = require("../controllers/controller");

router.post("/send-email", contactFormHandler);

module.exports = router;