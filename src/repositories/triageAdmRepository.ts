import { AppDataSource } from "../data-source";
import { TriageAdm } from '../entities/CreateTriageAdm';

export const triageAdmRepository = AppDataSource.getRepository(TriageAdm);