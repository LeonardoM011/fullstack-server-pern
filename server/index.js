const path = require("path");
const express = require("express");
const db = require("../database/db.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
    db.getUser(1)
        .then(() => {
            //res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
        });
    res.json("Hello");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
