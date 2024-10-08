import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ImportedTriage } from "../entities/ImportedTriage";
import { Triage } from "../entities/CreateTriage";
import { BadRequestError } from "../helpers/api-erros";
import { importedTriage } from "../repositories/ImportedTriageRepository";

export class ImportedTriageController {
    async importRowsToTriage(req: Request, res: Response) {
        try {
            const triageRows: ImportedTriage[] = req.body;

            if (!Array.isArray(triageRows) || triageRows.length === 0) {
                throw new BadRequestError("Nenhuma linha de triagem foi fornecida!");
            }

            const importedTriageRepository = AppDataSource.getRepository(ImportedTriage);
            const triageRepository = AppDataSource.getRepository(Triage);

            const savedImportedRows: ImportedTriage[] = [];
            for (const row of triageRows) {
                const newImportedTriage = importedTriageRepository.create(row);
                await importedTriageRepository.save(newImportedTriage);
                savedImportedRows.push(newImportedTriage);
            }

            const savedRows: Triage[] = [];
            for (const row of savedImportedRows) {
                const newTriage = triageRepository.create({
                    processNumber: row.processNumber,
                    plaintiff: row.plaintiff,
                    cpfCnpj: row.cpfCnpj,
                    bccReceivedDate: row.bccReceivedDate,
                    bccReceivedTime: row.bccReceivedTime,
                    captureDate: row.captureDate,
                    captureTime: row.captureTime,
                    distributionDate: row.distributionDate,
                    processSystem: row.processSystem,
                    communicationType: row.communicationType,
                    communicationDate: row.communicationDate,
                    communicationTime: row.communicationTime,
                    communicationEndDate: row.communicationEndDate,
                    defendant: row.defendant,
                    class_: row.class_,
                    forum: row.forum,
                    internalCode: row.internalCode,
                    court: row.court,
                    district: row.district,
                    justiceSecret: row.justiceSecret,
                    originCourt: row.originCourt,
                    subject: row.subject,
                    hearingDate: row.hearingDate,
                    hearingTime: row.hearingTime,
                    caseValue: row.caseValue,
                    forCompliance: row.forCompliance,
                    penalty: row.penalty,
                    penaltyType: row.penaltyType,
                    penaltyAmount: row.penaltyAmount,
                    deadline: row.deadline,
                    responsible: row.responsible,
                    obfDescription: row.obfDescription,
                    status: row.status,
                    state: row.state,
                    note: row.note,
                });

                await triageRepository.save(newTriage);
                savedRows.push(newTriage);
            }

            for (const row of savedImportedRows) {
                await importedTriageRepository.delete(row.id);
            }

            return res.status(201).json({
                message: "Linhas importadas e transferidas com sucesso para a tabela original de triagem!",
                data: savedRows,
            });
        } catch (error) {
            if (error instanceof BadRequestError) {
                return res.status(400).json({ error: error.message });
            } else {
                console.error(error);
                return res.status(500).json({ error: "Erro interno do servidor." });
            }
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const triages = await importedTriage.find();
            return res.json(triages);
        } catch (error) {
            return res.status(400).json({ error: "Erro ao buscar as triagens." });
        }
    }
}
