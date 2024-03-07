import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { hashSync, compareSync } from "bcrypt";
import { catchAsync } from "../utils/catchAsync";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const userRepository = AppDataSource.getRepository(User);

export const signup = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { name, email, pass } = request.body;
    const password = hashSync(pass, 10);

    const user = Object.assign(new User(), {
      name,
      email,
      password,
    });
    const saved = await userRepository.save(user);
    return response.status(200).send(saved);
  }
);

export const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const user = await userRepository.findOne({ where: { email: data.email } });
  if (!user) {
    return res.status(401).send("Incorrect Email");
  }
  if (!compareSync(data.password, user.password)) {
    return res.status(401).send("Incorrect Password");
  }
  const payload = {
    name: user.name,
    email: user.email,
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  return res.status(200).send({ email: user.email, id: user.id, token: token });
});
