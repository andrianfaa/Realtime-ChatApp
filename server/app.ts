/// <reference types="./express-env" />

import type { Request, Response, NextFunction } from "express";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import type { CorsOptions } from "cors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Server as SocketIOServer } from "socket.io";
import Socket from "./socket";

/* Express variables */
const app = express();
const server = http.createServer(app);
const port = 5000;
const corsOptions: CorsOptions = {
    origin: "*"
};
const io = new SocketIOServer(server, {
    cors: corsOptions
});

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use((req: Request, _res: Response, next: NextFunction) => {
    req.io = io;
    next();
});

/* Socket.io setup */
Socket(io);

/* Test endpoint */
app.use("/", (req: Request, res: Response) => {
    res.send(`Server is running`).end();
});

app.use("/ping", (req: Request, res: Response) => {
    res.send(`pong!`).end();
});

export { server, port };
