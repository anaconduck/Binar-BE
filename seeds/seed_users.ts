import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  const SALT = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("alex1234", SALT);

  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      name: "superadmin",
      email: "alex@gmail.com",
      password,
      role: "superadmin",
    },
  ]);
}