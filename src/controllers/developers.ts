import { Request, Response } from "express";
import { CreateDeveloperRequestBody } from "../interface/developers";

const connection = require("../database/connection")

module.exports = {
  async create(req: Request, res: Response): Promise<Response>{
    const requestBody = req.body as unknown
    const { name, age, gender, team, levelId } = requestBody as CreateDeveloperRequestBody;

    await connection("developers").insert({
      name,
      gender,
      age,
      team,
      levelId,
    });

    return res.status(201).json({
      message: "success",
    });
  },

  async index(req: Request, res: Response) {
    const developers = await connection("developers")
      .join("levels", "levels.id", "=", "developers.levelId")
      .select(["developers.*", "levels.name as levelName"])
      .orderBy("name", "asc");

    return res.status(200).json(developers);
  },
}