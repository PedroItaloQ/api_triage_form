import { Request, Response } from "express";
import { triageRepository } from "../repositories/triageRepository";
// import { BadRequestError } from "../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import { BadRequestError } from "../helpers/api-erros";

export class TriageController {
    async create(req: Request, res: Response) {
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
        } = req.body;

        console.log(
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
        );

        const processExists = await triageRepository.findOneBy({ numberOfProcess });

        if (processExists) {
            throw new BadRequestError("Número de processo já existe!");
        }

        const newTriage = triageRepository.create({ 
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
        });

        await triageRepository.save(newTriage);

        const { ...triage } = newTriage

        return res.status(201).json(triage);
    };

    async getAll(req: Request, res: Response) {
        try{
            const triages = await triageRepository.find();
            return res.json(triages);
        }catch (error) {
            throw new BadRequestError("Erro ao buscar as triagens.")
        }
    }

};