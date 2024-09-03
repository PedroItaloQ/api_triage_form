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
        try {
            const { name, lastName, email, password, sector, state, role, status } = req.body;
    
            console.log('Creating user:', { name, lastName, email, sector, state, role, status });
    
            const userName = req.body.userName || `${name} ${lastName}`;
    
            const existingUser = await userRepository.findOneBy({ email });
    
            if (existingUser) {
                throw new BadRequestError("Usuário já cadastrado!");
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = userRepository.create({
                name,
                lastName,
                userName,
                email,
                password: hashedPassword,
                sector,
                state,
                role,
                status: status ?? false,
            });
    
            console.log('Saving new user:', newUser);
    
            await userRepository.save(newUser);
    
            console.log('User created successfully:', newUser);
    
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: "Erro interno ao criar o usuário." });
        }
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

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '10h' });

        return res.json({ token, email: user.email, username: user.userName, sector: user.sector, state: user.state, role: user.role });
    }

    async uploadXlsx(req: Request, res: Response) {
        if (!req.file) {
            throw new BadRequestError("Nenhum arquivo foi enviado!");
        }

        const filePath = path.join(__dirname, '../../', req.file.path);

        try {
            const fileData = fs.readFileSync(filePath);

            const file = fileRepository.create({
                filename: req.file.originalname,
                data: fileData
            });

            await fileRepository.save(file);

            const workbook = XLSX.read(fileData);
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            for (const record of data) {
                const { name, lastName, email, password } = record as { name: string; lastName: string; email: string; password: string; };

                const existingUser = await userRepository.findOneBy({ email });
                if (existingUser) {
                    console.log(`Usuário com email ${email} já existe.`);
                    continue;
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const userName = `${name} ${lastName}`

                const newUser = userRepository.create({
                    name,
                    lastName,
                    userName,
                    email,
                    password: hashedPassword,
                });

                await userRepository.save(newUser);
            }

            fs.unlinkSync(filePath);

            return res.status(201).json({ message: "Arquivo enviado e processado com sucesso!" });
        } catch (error) {
            fs.unlinkSync(filePath);
            throw new BadRequestError("Erro ao processar o arquivo.");
        }
    }
}