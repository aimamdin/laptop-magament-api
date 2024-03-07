import { Router } from "express";
import * as UserController from "../controller/UserController";
import { validate } from "../middleware/validate";
import { createUser } from "../validations/userValidation";

const router = Router();
router.post("/api/auth/signup", validate(createUser), UserController.signup);
router.post("/api/auth/login", UserController.login);

export default router;
