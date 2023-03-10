import { Router } from "express";
import developersController from "./controllers/developers";
import levelsController from "./controllers/levels";

export const router: Router = Router();

router.post("/developers", developersController.create);
router.get("/developers", developersController.index);
router.get("/developer/:id", developersController.show);
router.put("/developer/:id", developersController.update);
router.delete("/developer/:id", developersController.delete);

router.post("/levels", levelsController.create);
router.get("/levels", levelsController.index);
router.get("/level/:id", levelsController.show);
router.put("/level/:id", levelsController.update);
router.delete("/level/:id", levelsController.delete);
