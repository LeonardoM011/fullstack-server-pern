import path from "path";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as bodyParser from "body-parser";
import * as db from "../database/db";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log(`Connection oppened: ${socket.id}`);
    socket.conn.on("packet", ({ type, data }) => {    
        // called for each packet received
    });
    socket.conn.on("close", (reason) => {
        console.log(`Connection closed: ${socket.id}`);
        // called when the underlying connection is closed  
    });
});

app.post("/api", (req, res) => {
    console.log(req.body.username);
    //console.log(req.query.password);
    /*db.getUserById(1)
        .then(res => {
            console.log(res.rows[0]);
            io.emit("login_response", { 'username': res.rows[0]['username'], 'password': res.rows[0]['password'] });
        })
        .catch(e => {
            console.error(e.stack);
        });*/
    //db.getUserByName("leonardo")
    //res.json("success");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
