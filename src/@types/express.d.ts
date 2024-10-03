import { Triage } from '../entities/CreateTriage';
import { TriageAdm } from '../entities/CreateTriageAdm';
import { User } from '../entities/User';

declare global {
	namespace Express {
		export interface Request {
			triage: Partial<Triage>;
			user: Partial<User>;
			triageAdm: Partial<TriageAdm>
		}
	}
}
