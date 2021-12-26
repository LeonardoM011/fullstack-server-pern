import path from "path";
import express from "express";
import * as db from "../database/db";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
    db.getUserById(1)
        .then(res => {
            console.log(res.rows[0]);
        })
        .catch(e => {
            console.error(e.stack);
        });
    res.json("");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
