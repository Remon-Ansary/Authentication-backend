const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")
const db = require("../lib/db.js")
const userMiddleware = require("../middleware/users.js")
router.post("/sign-up", userMiddleware.validateSignup, (req, res, next) => {
  db.query(
    `SELECT * FROM nodeauthentication WHERE LOWER(useremail) = LOWER(${db.escape(
      req.body.useremail
    )});`,
    (err, result) => {
      //   console.log(result)
      if (result.length) {
        return res.send({
          msg: "User already exists",
        })
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          db.query(
            `INSERT INTO nodeauthentication (id, useremail, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
              req.body.useremail
            )}, ${db.escape(hash)}, now())`,
            (err, result) => {
              if (err) {
                throw err
                return res.status(400).send({
                  msg: err,
                })
              }
              return res.send({
                msg: "Registered successfully!",
              })
            }
          )
        })
      }
    }
  )
})
router.post("/login", (req, res, next) => {})
router.get("/dashboard", (req, res, next) => {
  res.send("dashboard view")
})
module.exports = router
