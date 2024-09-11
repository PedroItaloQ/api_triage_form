import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/userRepository";
import { Triage } from "../entities/CreateTriage";
import { ImportedTriage } from "../entities/ImportedTriage";
import { fileRepository } from "../repositories/fileRepository";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import XLSX from "xlsx";

export class UserController {
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

            if (typeof status !== 'boolean') {
                throw new BadRequestError("O campo 'status deve ser um Booleano");
            };

            const newUser = userRepository.create({
                name,
                lastName,
                userName,
                email,
                password: hashedPassword,
                sector,
                state,
                role,
                status: status
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

        if (!user) {
            throw new BadRequestError("Usuário não encontrado")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
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
            // Ler o conteúdo do arquivo
            const fileData = fs.readFileSync(filePath);
    
            // Salvar o arquivo no banco de dados
            const file = fileRepository.create({
                filename: req.file.originalname,
                data: fileData
            });
    
            await fileRepository.save(file);
    
            // Ler o arquivo XLSX e converter para JSON
            const workbook = XLSX.read(fileData, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
    
            // Obter o repositório da entidade 'ImportedTriage'
            const importedTriageRepository = AppDataSource.getRepository(ImportedTriage);
            const savedRows: ImportedTriage[] = [];
    
            for (const record of data) {
                const {
                    numberOfProcess,
                    author,
                    cpf,
                    bccReceiptDate,
                    bccReceiptTime,
                    captureDate,
                    captureTime,
                    distributionData,
                    processSystem,
                    typeOfCommunication,
                    communicationDate,
                    communicationTime,
                    endDateOfCommunication,
                    reu,
                    classe,
                    foro,
                    internalCode,
                    vara,
                    comarca,
                    justiceSecret,
                    tribunalDeOrigem,
                    subject,
                    hearingDate,
                    hearingTime,
                    causeValue,
                    forFulfillment,
                    fine,
                    tipeOfFine,
                    valueOfFine,
                    fatalDeadline,
                    assigned,
                    obfDescription,
                    observation,
                    state,
                    status,
                } = record as ImportedTriage;
    
                // Criar um novo registro de triagem importada com status padrão 'false'
                const newImportedTriage = importedTriageRepository.create({
                    numberOfProcess,
                    author,
                    cpf,
                    bccReceiptDate,
                    bccReceiptTime,
                    captureDate,
                    captureTime,
                    distributionData,
                    processSystem,
                    typeOfCommunication,
                    communicationDate,
                    communicationTime,
                    endDateOfCommunication,
                    reu,
                    classe,
                    foro,
                    internalCode,
                    vara,
                    comarca,
                    justiceSecret,
                    tribunalDeOrigem,
                    subject,
                    hearingDate,
                    hearingTime,
                    causeValue,
                    forFulfillment,
                    fine,
                    tipeOfFine,
                    valueOfFine,
                    fatalDeadline,
                    assigned,
                    obfDescription,
                    observation,
                    state,
                    status: Boolean(status) || false, // Definir como 'false' se for indefinido ou falso
                });
    
                await importedTriageRepository.save(newImportedTriage);
                savedRows.push(newImportedTriage);
            }
    
            // Remover o arquivo após o processamento
            fs.unlinkSync(filePath);
    
            return res.status(201).json({
                message: "Arquivo enviado e processado com sucesso!",
                data: savedRows,
            });
        } catch (error) {
            // Remover o arquivo mesmo em caso de erro
            fs.unlinkSync(filePath);
            console.error("Erro ao processar o arquivo:", error);
            throw new BadRequestError("Erro ao processar o arquivo.");
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, lastName, email, password, sector, state, role, status } = req.body;

            console.log(`Recebida requisição de atualização para o usuário ID: ${id}`);

            const user = await userRepository.findOneBy({ id: parseInt(id) });

            if (!user) {
                console.error(`Usuário com ID ${id} não encontrado!`);
                throw new BadRequestError("Usuário não encontrado!");
            }

            console.log(`Usuário encontrado: ${JSON.stringify(user)}`);

            const existingUser = await userRepository.findOneBy({ email });

            if (existingUser && existingUser.id !== user.id) {
                console.error(`Outro usuário com o email ${email} já existe com ID ${existingUser.id}!`);
                throw new BadRequestError("Outro usuário com este email já existe!");
            }

            user.name = name || user.name;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.sector = sector || user.sector;
            user.state = state || user.state;
            user.role = role || user.role;
            user.status = typeof status === 'boolean' ? status : user.status;

            console.log(`Dados do usuário após atualização: ${JSON.stringify(user)}`);

            if (password) {
                user.password = await bcrypt.hash(password, 10);
                console.log(`Senha do usuário com ID ${id} foi atualizada.`);
            }

            await userRepository.save(user);

            console.log(`Usuário com ID ${id} atualizado com sucesso!`);

            return res.json({ message: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return res.status(500).json({ message: "Erro interno ao atualizar o usuário." });
        }
    }




    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userRepository.find();
            return res.json(users);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar as triagens." });
        }
    }
}