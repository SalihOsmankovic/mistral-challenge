import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.get("/", "UsersController.show");
    Route.get("/:id", "UsersController.showById");
    Route.post("/", "UsersController.create");
    Route.post("/permission", "UsersController.assignPermission");
    Route.put("/:id", "UsersController.update");
    Route.delete("/permission", "UsersController.unassignPermission");
    Route.delete("/:id", "UsersController.delete");
  }).prefix("/users");

  Route.group(() => {
    Route.get("/", "PermissionsController.show");
    Route.post("/", "PermissionsController.create");
    Route.put("/:id", "PermissionsController.update");
    Route.delete("/:id", "PermissionsController.delete");
  }).prefix("/permissions");
}).prefix("/api");
