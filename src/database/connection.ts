import knex from "knex";
import config from "./../knexfile";

export const connection = knex(config.development);
