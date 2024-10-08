import { Request, Response } from "express";
import { triageRepository } from "../repositories/triageRepository";
import { BadRequestError } from "../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';

export class TriageController {
    async create(req: Request, res: Response) {
        try {
            const {
                processNumber,
                plaintiff,
                cpfCnpj,
                bccReceivedDate,
                bccReceivedTime,
                captureDate,
                captureTime,
                distributionDate,
                processSystem,
                communicationType,
                communicationDate,
                communicationTime,
                communicationEndDate,
                defendant,
                class_,
                forum,
                internalCode,
                court,
                district,
                justiceSecret,
                originCourt,
                subject,
                hearingDate,
                hearingTime,
                caseValue,
                forCompliance,
                penalty,
                penaltyType,
                penaltyAmount,
                deadline,
                responsible,
                obfDescription,
                note,
                state,
                status = false
            } = req.body;

            console.log(
                processNumber,
                plaintiff,
                cpfCnpj,
                bccReceivedDate,
                bccReceivedTime,
                captureDate,
                captureTime,
                distributionDate,
                processSystem,
                communicationType,
                communicationDate,
                communicationTime,
                communicationEndDate,
                defendant,
                class_,
                forum,
                internalCode,
                court,
                district,
                justiceSecret,
                originCourt,
                subject,
                hearingDate,
                hearingTime,
                caseValue,
                forCompliance,
                penalty,
                penaltyType,
                penaltyAmount,
                deadline,
                responsible,
                obfDescription,
                note,
                state,
                status
            );

            const processExists = await triageRepository.findOneBy({ processNumber });

            if (processExists) {
                throw new BadRequestError("Número de processo já existe!");
            }

            const newTriage = triageRepository.create({
                processNumber,
                plaintiff,
                cpfCnpj,
                bccReceivedDate,
                bccReceivedTime,
                captureDate,
                captureTime,
                distributionDate,
                processSystem,
                communicationType,
                communicationDate,
                communicationTime,
                communicationEndDate,
                defendant,
                class_,
                forum,
                internalCode,
                court,
                district,
                justiceSecret,
                originCourt,
                subject,
                hearingDate,
                hearingTime,
                caseValue,
                forCompliance,
                penalty,
                penaltyType,
                penaltyAmount,
                deadline,
                responsible,
                obfDescription,
                note,
                state,
                status: status
            });

            await triageRepository.save(newTriage);

            const { ...triage } = newTriage

            return res.status(201).json(triage);

        } catch (error) {
            if (error instanceof BadRequestError) {
                return res.status(400).json({ error: error.message });
            } else {
                console.error(error);
                return res.status(500).json({ error: "Erro interno do servidor." });
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { processNumber } = req.params;
            console.log(`Iniciando atualização do processo: ${processNumber}`);
    
            const {
                plaintiff,
                cpfCnpj,
                bccReceivedDate,
                bccReceivedTime,
                captureDate,
                captureTime,
                distributionDate,
                processSystem,
                communicationType,
                communicationDate,
                communicationTime,
                communicationEndDate,
                defendant,
                class_,
                forum,
                internalCode,
                court,
                district,
                justiceSecret,
                originCourt,
                subject,
                hearingDate,
                hearingTime,
                caseValue,
                forCompliance,
                penalty,
                penaltyType,
                penaltyAmount,
                deadline,
                responsible,
                obfDescription,
                note,
                state,
                status
            } = req.body;
    
            console.log('Dados recebidos para atualização:', {
                plaintiff,
                cpfCnpj,
                bccReceivedDate,
                bccReceivedTime,
                captureDate,
                captureTime,
                distributionDate,
                processSystem,
                communicationType,
                communicationDate,
                communicationTime,
                communicationEndDate,
                defendant,
                class_,
                forum,
                internalCode,
                court,
                district,
                justiceSecret,
                originCourt,
                subject,
                hearingDate,
                hearingTime,
                caseValue,
                forCompliance,
                penalty,
                penaltyType,
                penaltyAmount,
                deadline,
                responsible,
                obfDescription,
                note,
                state,
                status
            });
    
            const processExists = await triageRepository.findOneBy({ processNumber });
    
            if (!processExists) {
                console.log('Processo não encontrado:', processNumber);
                throw new BadRequestError("Processo não encontrado!");
            }
    
            console.log('Processo encontrado:', processExists);
    
            // Atualiza os campos do processo encontrado com os dados recebidos
            triageRepository.merge(processExists, {
                plaintiff,
                cpfCnpj,
                bccReceivedDate,
                bccReceivedTime,
                captureDate,
                captureTime,
                distributionDate,
                processSystem,
                communicationType,
                communicationDate,
                communicationTime,
                communicationEndDate,
                defendant,
                class_,
                forum,
                internalCode,
                court,
                district,
                justiceSecret,
                originCourt,
                subject,
                hearingDate,
                hearingTime,
                caseValue,
                forCompliance,
                penalty,
                penaltyType,
                penaltyAmount,
                deadline,
                responsible,
                obfDescription,
                note,
                state,
                status
            });
    
            console.log('Dados do processo após merge:', processExists);
    
            await triageRepository.save(processExists);

            console.log('Processo salvo com o novo status:', processExists.status);

            console.log('Processo salvo com sucesso:', processExists);
    
            return res.status(200).json({
                message: "Processo atualizado com sucesso.",
                data: processExists
            });
    
        } catch (error) {
            if (error instanceof BadRequestError) {
                console.log('Erro de validação:', error.message);
                return res.status(400).json({ error: error.message });
            } else {
                console.error('Erro interno do servidor:', error);
                return res.status(500).json({ error: "Erro interno do servidor." });
            }
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const triages = await triageRepository.find();
            return res.json(triages);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar as triagens." });
        }
    }
}
