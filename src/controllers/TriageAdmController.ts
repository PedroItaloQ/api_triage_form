import { TriageAdm } from "../entities/CreateTriageAdm";
import { Request, Response } from 'express';
import 'dotenv/config';
import { triageAdmRepository } from "../repositories/triageAdmRepository";
import { BadRequestError } from "../helpers/api-erros";
import { error } from "console";

export class TriageAdmController {
    async create(req: Request, res: Response) {
        try {
            const {
                dateOfReceipt,
                dateOfTreatment,
                subject,
                type,
                emission,
                recipient,
                areaSector,
                responsible,
                descriptionObf,
                note
            } = req.body;

            console.log(
                dateOfReceipt,
                dateOfTreatment,
                subject,
                type,
                emission,
                recipient,
                areaSector,
                responsible,
                descriptionObf,
                note
            )

            const processExists = await triageAdmRepository.findOneBy({ type });

            if(processExists){
                throw new BadRequestError("Número do processo já existe!");
            }

            const newTriageAdm = triageAdmRepository.create({
                dateOfReceipt,
                dateOfTreatment,
                subject,
                type,
                emission,
                recipient,
                areaSector,
                responsible,
                descriptionObf,
                note
            });

            await triageAdmRepository.save(newTriageAdm);

            const { ...triageAdm } = newTriageAdm;

            return res.status(201).json(triageAdm);
        } catch (error) {
            if (error instanceof BadRequestError) {
                return res.status(400).json({ error: error.message });
            } else {
                console.error(error);
                return res.status(500).json({ error: "Erro interno do servidor." });
            }
        }
    }

    async getAll(req: Request, res:Response){
        try{
            const triagesAdm = await triageAdmRepository.find();
            return res.json(triagesAdm);
        } catch {
            return res.status(400).json({error: "Erro ao buscar processos administrativos!"});
        };
    };
};