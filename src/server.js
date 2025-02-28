import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { corsConfigs } from './config/corsConfigs.js';
import { pinoConfigs } from './config/pinoConfigs.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env(ENV_VARS.PORT, 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors(corsConfigs));

  app.use(pino(pinoConfigs));

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server is running on PORT: ${PORT}`);
});

};