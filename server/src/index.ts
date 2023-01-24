import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRouter from './routers/auth.router';
import pollRouter from './routers/poll.router';
import templateRouter from './routers/template.router';
import resultRouter from './routers/result.router';
import { AppLogger } from './logger/index';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/poll', pollRouter);
app.use('/api/template', templateRouter);
app.use('/api/result', resultRouter);
app.use('/static', express.static(path.join(__dirname + '/public')));
(async function start() {
  try {
    await mongoose.connect(process.env.DB_URI);
    AppLogger.info('Connected to database');
  } catch (e) {
    AppLogger.error(e.message);
  }
})();

app.get('/', function (_, res) {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
      <title>server page</title>
      <meta charset="utf-8" />
  </head>
  <body>
      <h1>express server is running</h1>
  </body>
  <html>`);
});

app.listen(port, () => AppLogger.info(`Server is running on port ${port}`));
