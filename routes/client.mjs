import express from "express";
import { getHome, getTeam } from "../controllers/client.mjs";

const router = express.Router();

router.get("/", getHome);
router.get("/team", getTeam);

export default router;