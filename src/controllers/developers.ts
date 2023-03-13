import { query, Request, Response } from "express";
import { CreateDeveloperRequestBody } from "../interfaces/developers";
import { connection } from "../database/connection";

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const requestBody = req.body as unknown;
    const { name, birthdate, gender, team, levelId } =
      requestBody as CreateDeveloperRequestBody;

    await connection("developers").insert({
      name,
      gender,
      birthdate,
      team,
      levelId,
    });

    return res.status(201).json({
      message: "success",
    });
  },

  async index(req: Request, res: Response) {
    const { name } = req.query;
    const developers = await connection("developers")
      .join("levels", "levels.id", "=", "developers.levelId")
      .select(["developers.*", "levels.name as levelName"])
      .orderBy("name", "asc")
      .modify((queryBuilder) => {
        if (name) {
          queryBuilder.where('developer.name', 'like', `%${name}%`)
        }
      });

    return res.status(200).json(developers);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const developer = await connection("developers")
      .join("levels", "levels.id", "=", "developers.levelId")
      .select(["developers.*", "levels.name as levelName"])
      .where("developers.id", id)
      .first();

    return res.json(developer);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const data = req.body;

    await connection("developers").where("id", id).update(data);

    return res.status(200).json({ message: "success" });
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await connection("developers").where("id", id).delete();

    return res.status(204).send();
  },
};
