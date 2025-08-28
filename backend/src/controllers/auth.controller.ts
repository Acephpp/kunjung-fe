import { Request, Response } from "express";

export class AuthController {
  async userRegister(req: Request, res: Response) {
    try {
      res.status(201).send("User registered");
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
}
