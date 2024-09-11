import { Router } from 'express';
import { TriageController } from '../src/controllers/TriageController';
import { UserController } from '../src/controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';
import multer from 'multer';
import { ImportedTriageController } from './controllers/ImportedTriageController';

const routes = Router();

const upload = multer({ dest: 'uploads/' });
const importedTriageController = new ImportedTriageController();

const triageController = new TriageController();
const userController = new UserController();

routes.post("/triagem", authMiddleware, triageController.create);
routes.get("/triagem", triageController.getAll);

routes.post("/imported-triage/importar-linhas", importedTriageController.importRowsToTriage);
routes.get("/triagem-importados", importedTriageController.getAll);

routes.post("/auth/login", userController.login);

routes.post("/register", userController.create);
routes.get("/users", userController.getAllUsers)
routes.put("/users/:id", authMiddleware, userController.update);

routes.post("/upload", upload.single('file'), userController.uploadXlsx);

export default routes;