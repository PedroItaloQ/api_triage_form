import { AppDataSource } from "../data-source";
import { ImportedTriage } from "../entities/ImportedTriage";

export const importedTriage = AppDataSource.getRepository(ImportedTriage);