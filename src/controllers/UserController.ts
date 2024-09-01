import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import { fileRepository } from "../repositories/fileRepository";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

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

    async uploadXlsx(req: Request, res: Response) {
        if (!req.file) {
            throw new BadRequestError("Nenhum arquivo foi enviado!");
        }

        const filePath = path.join(__dirname, '../../', req.file.path);

        try {
            const fileData = fs.readFileSync(filePath);

            // Salvar o arquivo no banco de dados como Blob
            const file = fileRepository.create({
                filename: req.file.originalname,
                data: fileData
            });

            await fileRepository.save(file);

            // Processar o conteúdo do arquivo (opcional)
            const workbook = XLSX.read(fileData);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            for (const record of data) {
                const { username, email, password } = record as { username: string; email: string; password: string; };

                const existingUser = await userRepository.findOneBy({ email });
                if (existingUser) {
                    console.log(`Usuário com email ${email} já existe.`);
                    continue;
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = userRepository.create({
                    username,
                    email,
                    password: hashedPassword,
                });

                await userRepository.save(newUser);
            }

            fs.unlinkSync(filePath); // Remover o arquivo temporário

            return res.status(201).json({ message: "Arquivo enviado e processado com sucesso!" });
        } catch (error) {
            fs.unlinkSync(filePath);
            throw new BadRequestError("Erro ao processar o arquivo.");
        }
    }
}