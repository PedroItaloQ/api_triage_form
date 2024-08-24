import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class UserController{
    async create(req: Request, res: Response) {
        const { username, email, password } = req.body;

        const existingUser = await userRepository.findOneBy({ email });

        if (existingUser) {
            throw new BadRequestError("Usuário já cadastrado!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        await userRepository.save(newUser);

        return res.status(201).json({ message: "Usuário criado com sucesso!" });
    }


    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userRepository.findOneBy({ email });

        if(!user) {
            throw new BadRequestError("Usuário não encontrado")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            throw new BadRequestError("Senha inválida!");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return res.json({ token, email: user.email, username: user.username });
    }
}