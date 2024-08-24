import { Router } from 'express';
import { TriageController } from '../src/controllers/TriageController';
import { UserController } from '../src/controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();
const triageController = new TriageController();
const userController = new UserController();

routes.post("/triagem", authMiddleware, triageController.create);
routes.get("/triagem", triageController.getAll);

routes.post("/register", userController.create);
routes.post("/login", userController.login);

export default routes;