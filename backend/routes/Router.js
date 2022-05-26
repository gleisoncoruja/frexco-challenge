const express = require("express");
const router = express();

// Import routers
router.use("/api/users", require("./UserRouter"));
router.use("/api/categories", require("./CategoryRouter"));
router.use("/api/products", require("./ProductRouter"));

// test route
router.get("/", (req, res) => {
  res.send("Api Working!");
});

module.exports = router;
