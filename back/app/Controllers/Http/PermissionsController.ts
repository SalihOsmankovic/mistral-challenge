import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Permission from "App/Models/Permission";
import CreatePermissionValidator from "App/Validators/Permission/CreatePermissionValidator";
import UpdatePermissionValidator from "App/Validators/Permission/UpdatePermissionValidator";

export default class PermissionsController {
  async show({}: HttpContextContract) {
    return Permission.all();
  }

  async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreatePermissionValidator);
    const permission = await Permission.create(payload);
    return permission;
  }

  async update({ request, params }: HttpContextContract) {
    const { id } = params;

    const permission = await Permission.findOrFail(id);
    const payload = await request.validate(UpdatePermissionValidator);

    permission.merge(payload);
    await permission.save();

    return permission;
  }

  async delete({ params }: HttpContextContract) {
    const { id } = params;

    const permission = await Permission.findOrFail(id);
    await permission.delete();

    return "Permission deleted successfully";
  }
}
