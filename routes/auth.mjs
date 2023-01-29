import express from "express";
import { getLogin, postLogin, postLogout } from "../controllers/auth.mjs";
import isAuthorized from "../middlewares/isAuthorized.mjs";

const router = express.Router();

router.get("/login", getLogin);
router.post("/login", postLogin);
router.get('/logout', isAuthorized, postLogout);

export default router;