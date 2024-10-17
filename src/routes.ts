import { Router } from 'express';
import { TriageController } from '../src/controllers/TriageController';
import { TriageAdmController } from './controllers/TriageAdmController';
import { UserController } from '../src/controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';
import multer from 'multer';
import { ImportedTriageController } from './controllers/ImportedTriageController';

const routes = Router();

const upload = multer({ dest: 'uploads/' });
const importedTriageController = new ImportedTriageController();

const triageController = new TriageController();
const triagesAdmController = new TriageAdmController();
const userController = new UserController();

routes.post("/triage/legal/create/process", authMiddleware, triageController.create);
routes.get("/triage/legal/processes", triageController.getAll);
routes.put("/triage/legal/update/process/:numberOfProcess", authMiddleware, triageController.update);

routes.post("/triage/administrative/create/process", authMiddleware, triagesAdmController.create);
routes.get("/triage/administrative/processes" , authMiddleware, triagesAdmController.getAll);


routes.post("/imported-triage/importar-linhas", importedTriageController.importRowsToTriage);
routes.get("/triagem-importados", importedTriageController.getAll);

routes.post("/auth/login", userController.login);

routes.post("/auth/register", userController.create);
routes.get("/users/view", userController.getAllUsers);
routes.put("/users/:id", authMiddleware, userController.update);

routes.post("/format", upload.single('file'), userController.uploadXlsx);

export default routes;