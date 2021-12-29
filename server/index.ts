import path from "path";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as db from "../database/db";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => { 
    socket.conn.on("packet", ({ type, data }) => {    
        // called for each packet received
    });
    socket.conn.on("close", (reason) => {
        // called when the underlying connection is closed  
    });
});

app.get("/api", (req, res) => {
    /*db.getUserById(1)
        .then(res => {
            console.log(res.rows[0]);
        })
        .catch(e => {
            console.error(e.stack);
        });*/
    //db.getUserByName("leonardo");
    res.json("");
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});



httpServer.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
