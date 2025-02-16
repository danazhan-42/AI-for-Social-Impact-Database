import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    return res.status(200).json({
      isAuthenticated: true,
      user: req.oidc.user,
    });
  } else {
    return res.status(200).json(false);
  }
});

export default router;
