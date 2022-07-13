import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreatePermissionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    code: schema.string({ trim: true, escape: true }, [
      rules.minLength(3),
      rules.unique({ table: "permissions", column: "code" }),
    ]),
    description: schema.string.optional({ trim: true, escape: true }),
  });

  public messages: CustomMessages = {};
}
