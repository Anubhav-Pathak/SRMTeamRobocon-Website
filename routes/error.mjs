import express from "express"
import { getError } from "../controllers/error.mjs";

const router = express.Router();

router.use("", getError);

export default router;