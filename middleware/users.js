module.exports = {
  validateSignup: (req, res, next) => {
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.send({
        msg: "Both password fields must be filled and must match",
      })
    }
    next()
  },
}
