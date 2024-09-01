import { Router } from 'express';
import { TriageController } from '../src/controllers/TriageController';
import { UserController } from '../src/controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';
import multer from 'multer';

const routes = Router();

const upload = multer({ dest: 'uploads/' });

const triageController = new TriageController();
const userController = new UserController();

routes.post("/triagem", authMiddleware, triageController.create);
routes.get("/triagem", triageController.getAll);

routes.post("/register", userController.create);
routes.post("/auth/login", userController.login);

routes.post("/upload", upload.single('file'), userController.uploadXlsx);

export default routes;