import { Request, Response } from "express";
import { CreateLevelRequestBody } from "../interfaces/levels";
import { connection } from "../database/connection";

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const requestBody = req.body as unknown;
    const { name } = requestBody as CreateLevelRequestBody;

    await connection("levels").insert({
      name,
    });

    return res.status(201).json({
      message: "success",
    });
  },

  async index(req: Request, res: Response) {
    const levels = await connection("levels")
      .count("developers.id", { as: "quantity" })
      .leftJoin("developers", "developers.levelId", "=", "levels.id")
      .select(["developers.id", "levels.*"])
      .groupBy("levels.id")
      .orderBy("quantity", "desc");
    return res.status(200).json(levels);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const level = await connection("levels").select("*").where("id", id);

    return res.json(level);
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const data = req.body;

    await connection("levels").where("id", id).update(data);

    return res.status(200).json({ message: "success" });
  },

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const developerUsingLevel = await connection("developers")
      .where("id", id)
      .first();

    if (developerUsingLevel) {
      return res.status(501).json({
        message:
          "Não é possivel deletar esse nivel, pois há desenvolvedores cadastrados.",
      });
    }

    await connection("levels").where("id", id).delete();

    return res.status(204).send();
  },
};
