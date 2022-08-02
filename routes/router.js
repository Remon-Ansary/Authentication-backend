const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const db = require("../lib/db.js")
router.post("/sign-up", (req, res, next) => {})
router.post("/login", (req, res, next) => {})
router.get("/dashboard", (req, res, next) => {
  res.send("dashboard view")
})
module.exports = router
