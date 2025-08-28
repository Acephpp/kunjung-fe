import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/users", this.authController.userRegister);
  }

  getRouter(): Router {
    return this.router;
  }
}
