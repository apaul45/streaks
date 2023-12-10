import { Router, Request, Response } from "express";
import { dbManager } from "../db/di";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      errorMessage: "invalid email, username, or password",
    });
  }

  let user = await dbManager.getUser(username);

  if (user) {
    return res.status(400).json({
      error: true,
      errorMessage: "User already exists",
    });
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const passwordHash = await bcrypt.hash(password, salt);

  user = await dbManager.registerUser(username, passwordHash);
  res.status(200).json({ ...user });
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      errorMessage: "empty email/username or password",
    });
  }

  let user = await dbManager.getUser(username);

  if (!user) {
    return res.status(400).json({
      error: true,
      errorMessage: "user not found",
    });
  }

  if (!(await bcrypt.compare(password, user.passwordHash as string))) {
    return res.status(401).json({
      error: true,
      errorMessage: "invalid username/email or password",
    });
  }

  res.status(200).json({ ...user });
});

router.get("/:username", async (request: Request, response: Response) => {
  const { username } = request.params;

  const user = await dbManager.getUser(username);

  if (!user) {
    return response.status(400).json({ message: "User not found" });
  }

  response.status(200).json({ ...user });
});

router.put("/:username", async (request: Request, response: Response) => {
  try {
    const { username } = request.params;
    const { changes } = request.body;

    await dbManager.updateUser(username, changes);
    response.status(200).json({ message: "Update was successful" });
  } catch (e) {
    return response.status(400).json({ message: "Error when updating. Please try again" });
  }
});

export default router;
