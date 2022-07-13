import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    lastName: schema.string.optional({ trim: true, escape: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    username: schema.string({ trim: true, escape: true }, [
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: "users", column: "username" }),
    ]),
    email: schema.string({ trim: true, escape: true }, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
    ]),
    status: schema.string.optional({ trim: true, escape: true }, []),
    password: schema.string({ trim: true, escape: true }, [rules.minLength(8)]),
  });

  public messages: CustomMessages = {
    required: "The {{ field }} is required to create a new account",
    minLength:
      "The {{ field }} needs to be at least {{ options.minLength }} characters long",
    maxLength:
      "The {{ field }} must be under {{ options.maxLength }} characters long",
    unique: "An account with that {{ field }} already exists",
    email: "That email is not valid",
  };
}
