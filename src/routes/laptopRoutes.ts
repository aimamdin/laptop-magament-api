import * as LaptopController from "../controller/LaptopController";
import { Router } from "express";
import passport from "passport";
import { validate } from "../middleware/validate";
import { createLaptop } from "../validations/laptopValidation";

const router = Router();

router.get("/api/laptops", LaptopController.index);
router.post(
  "/api/laptops",
  passport.authenticate("jwt", { session: false }),
  validate(createLaptop),
  LaptopController.save
);
router.put(
  "/api/laptops/:id",
  passport.authenticate("jwt", { session: false }),
  LaptopController.update
);
router.delete(
  "/api/laptops/:id",
  passport.authenticate("jwt", { session: false }),
  LaptopController.remove
);

export default router;
