import express, { Request, Response } from 'express';
require('dotenv').config();
import next from 'next';
import feedsRouter from './routes/feeds';
import bodyParser from 'body-parser';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(bodyParser.json());
    server.use('/api/feeds', feedsRouter);
    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV || 'dev'}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
