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
    db.getUserByName(req.body.username)
        .then(data => {
            console.log(data.rows[0]);
            if (data.rows[0]) {
                if (req.body.password === data.rows[0]['password']) {
                    console.log(`$(req.body.username) logged in`);
                    io.emit("login_response", { 'success': true, 'token': '123456' });
                } else {
                    io.emit("login_response", { 'success': false, 'token': '' });
                }
            } else {
                io.emit("login_response", { 'success': false, 'token': '' });
            }
        })
        .catch(e => {
            console.error(e.stack);
        }
    );
    res.json("success");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
