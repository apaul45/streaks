import mongoose from "mongoose";
import { DbManager } from "../di";
import UserModel from "./models";

export class MongoDbManager implements DbManager {
  constructor(connectionString: string) {
    mongoose
      .connect(connectionString)
      .then(() => console.log("mongodb connected"))
      .catch((e) => console.error("Connection error", e.message));
  }

  async registerUser(username: string, passwordHash: string) {
    const user = await UserModel.create({
      username: username,
      passwordHash: passwordHash,
      streak: 0,
      coins: 0,
    });

    return user ? user.toObject() : null;
  }

  async getUser(username: string) {
    const user = await UserModel.findOne({ username });

    return user ? user.toObject() : null;
  }

  async updateUser(username: string, body: any) {
    console.log(body);
    const user = await UserModel.updateOne(
      { username: username },
      { $set: body }
    );

    if (!user || user.modifiedCount == 0) {
      throw new Error();
    }
  }
}
