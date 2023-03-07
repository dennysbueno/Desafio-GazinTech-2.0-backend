import { Router } from "express";

export const router: Router = Router();

const developersController = require("./controllers/developers")
const levelsController = require("./controllers/levels")

router.post("/developers", developersController.create);
router.get("/developers", developersController.index);

router.post("/levels", levelsController.create);
router.get("/levels", levelsController.index);

module.exports = router;