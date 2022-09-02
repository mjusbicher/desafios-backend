export default function validateAdmin(req, res, next) {
  if (req.body.admin === true) {
    next();
  } else {
    res.json({
      error: "Error, no admin user",
    });
  }
}
