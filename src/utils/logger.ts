import pino from 'pino';

export const logger = pino({
  name: 'CatsApi',
  level: 'info'
});
