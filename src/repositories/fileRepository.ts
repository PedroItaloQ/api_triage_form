import { AppDataSource } from "../data-source";
import { File } from "../entities/File";

export const fileRepository = AppDataSource.getRepository(File);
