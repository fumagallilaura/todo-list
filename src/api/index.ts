import express from 'express';
import routes from './routes';
import { cors } from './middlewares';


const api = express();
const port = 3000;

// input middlewares
api.use(express.json());
api.use(cors)

// root router
api.use('/', routes);

export default api;
