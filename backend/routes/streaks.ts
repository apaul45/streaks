import { Router, Request, Response } from "express";
import { dbManager } from "../db/di";

const router = Router();

router.get(
  "/get-user/:username",
  async (request: Request, response: Response) => {
    const { username } = request.params;

    const user = await dbManager.getUser(username);

    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    response.status(200).json({ user });
  }
);

export default router;
