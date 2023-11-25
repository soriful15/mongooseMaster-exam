import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { usersRoutes } from './modules/users/users.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api', usersRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running on port 7000');
});

export default app;
