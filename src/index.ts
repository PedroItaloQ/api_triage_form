import 'express-async-errors';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import cors from "cors";
import { errorMiddleware } from './middlewares/error';

AppDataSource.initialize().then(() => {
    const app = express();
    
    app.use(cors());

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error('Error during Data Source initialization:', err);
});