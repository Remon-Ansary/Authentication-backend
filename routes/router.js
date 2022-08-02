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
      if (result.length) {
        return res.send({
          msg: "User already exists",
        })
      } else {
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
router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM nodeauthentication WHERE useremail = ${db.escape(
      req.body.useremail
    )};`,
    (err, result) => {
      if (err) {
        throw err
        return res.send({
          msg: err,
        })
      }
      if (!result.length) {
        return res.send({
          msg: "Useremail or password is incorrect",
        })
      }
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (Err, Result) => {
          if (Err) {
            throw Err
            return res.send({
              msg: "Useremail or password is incorrect",
            })
          }
          if (Result) {
            return res.send({
              msg: "Logged in successfully",
              user: result[0],
            })
          }
          return res.send({
            msg: "Useremail or password is incorrect",
          })
        }
      )
    }
  )
})
router.get("/dashboard", (req, res, next) => {
  res.send("dashboard view")
})
module.exports = router
