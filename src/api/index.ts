import compression from 'compression';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { cors, errorHandler } from './middlewares';
import routes from './routes';

const api = express();

// input middlewares
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(compression({ threshold: 0 }));
api.use(helmet());
api.use(cors);
// root router
api.use('/', routes);
// output middlewares
api.use(errorHandler);

export default api;
