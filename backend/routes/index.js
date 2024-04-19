const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require("jsonwebtoken")

const authRouter = require("./auth");
const ingredientsRouter = require("./ingredients");
const recipesRouter = require("./recipes");

router.use("/auth", authRouter);
router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token.split(" ")[1], "MY_SECRET")
        req.user = user;
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
    }
})

router.use("/ingredients", ingredientsRouter);
router.use("/recipes", recipesRouter)

module.exports = router
