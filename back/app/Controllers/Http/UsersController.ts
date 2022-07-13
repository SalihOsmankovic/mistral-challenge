import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import CreateUserValidator from "App/Validators/User/CreateUserValidator";
import UpdateUserValidator from "App/Validators/User/UpdateUserValidator";

export default class UsersController {
  async show({ request }: HttpContextContract) {
    const { page = 1, order_by = "id" } = request.qs();
    return User.query().orderBy(order_by, "asc").paginate(page, 10);
  }

  async showById({ params }: HttpContextContract) {
    const { id } = params;

    return User.findOrFail(id);
  }

  async create({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator);
    const user = await User.create(payload);
    return user;
  }

  async update({ request, params }: HttpContextContract) {
    const { id } = params;
    const payload = await request.validate(UpdateUserValidator);

    const user = await User.findOrFail(id);

    user.merge(payload);
    await user.save();

    return user;
  }

  async delete({ params }: HttpContextContract) {
    const { id } = params;

    const user = await User.findOrFail(id);
    await user.delete();

    return "User deleted successfully";
  }

  async assignPermission({}: HttpContextContract) {}

  async unassignPermission({}: HttpContextContract) {}
}
