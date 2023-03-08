import { Router } from "express";

export const router: Router = Router();

const developersController = require("./controllers/developers")
const levelsController = require("./controllers/levels")

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

module.exports = router;