import express, { Request, Response, Application } from 'express';
import { findCatName } from './store';
import { logger } from './utils/logger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// base url
app.get('/', (req: Request, res: Response): void => {
  res.status(404).send();
});

app.get('/ping', (req: Request, res: Response): void => {
  res.send('pong');
});

// returning cats based on their id
app.get('/cats/:id', (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id);

  // filtering JSON data to find matching cat
  const matchingCatName = findCatName(id);

  matchingCatName ? res.send({ name: matchingCatName }) : res.status(404).send();
});

app.listen({ port: PORT, host: '0.0.0.0' }, (): void => {
  logger.info(`Server Running on https://localhost:${PORT}`);
});
