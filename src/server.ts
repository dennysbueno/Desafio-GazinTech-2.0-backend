import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./routers";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.listen(process.env.API_PORT || 3000);
