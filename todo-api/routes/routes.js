import { Router } from "express";
import { config } from "dotenv";

config();
const apiKey = process.env.API_KEY;

const router = Router();




export { router}