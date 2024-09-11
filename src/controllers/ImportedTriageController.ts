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
                    numberOfProcess: row.numberOfProcess,
                    author: row.author,
                    cpf: row.cpf,
                    bccReceiptDate: row.bccReceiptDate,
                    bccReceiptTime: row.bccReceiptTime,
                    captureDate: row.captureDate,
                    captureTime: row.captureTime,
                    distributionData: row.distributionData,
                    processSystem: row.processSystem,
                    typeOfCommunication: row.typeOfCommunication,
                    communicationDate: row.communicationDate,
                    communicationTime: row.communicationTime,
                    endDateOfCommunication: row.endDateOfCommunication,
                    reu: row.reu,
                    classe: row.classe,
                    foro: row.foro,
                    internalCode: row.internalCode,
                    vara: row.vara,
                    comarca: row.comarca,
                    justiceSecret: row.justiceSecret,
                    tribunalDeOrigem: row.tribunalDeOrigem,
                    subject: row.subject,
                    hearingDate: row.hearingDate,
                    hearingTime: row.hearingTime,
                    causeValue: row.causeValue,
                    forFulfillment: row.forFulfillment,
                    fine: row.fine,
                    tipeOfFine: row.tipeOfFine,
                    valueOfFine: row.valueOfFine,
                    fatalDeadline: row.fatalDeadline,
                    assigned: row.assigned,
                    obfDescription: row.obfDescription,
                    status: row.status,
                    state: row.state,
                    observation: row.observation,
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
