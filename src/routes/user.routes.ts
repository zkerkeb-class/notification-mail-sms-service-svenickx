import { Router } from "express";
import UserController from "../controllers/user.controller";

export default class UserRoutes {
  router: Router;

  constructor(private readonly userController: UserController) {
    this.router = Router();
    this.createRoutes();
  }

  private createRoutes() {
    this.router.post("/register", this.userController.register);
  }
}
