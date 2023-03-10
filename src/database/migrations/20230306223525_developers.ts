import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("developers", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("age").notNullable();
    table.string("gender").notNullable();
    table.string("team").notNullable();
    table
      .integer("levelId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("levels")
      .onDelete("RESTRICT");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("developers");
}
