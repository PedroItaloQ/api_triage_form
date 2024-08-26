import { AppDataSource } from "../data-source";
import { Triage } from "../entities/CreateTriage";

export const triageRepository = AppDataSource.getRepository(Triage);