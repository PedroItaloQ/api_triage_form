import { Triage } from '../entities/CreateTriage';
import { User } from '../entities/User';

declare global {
	namespace Express {
		export interface Request {
			triage: Partial<Triage>;
			user: Partial<User>;
		}
	}
}
