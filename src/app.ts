import express from 'express';
import routes from './routes'
import "reflect-metadata";
import { AppDataSource } from './db';
import { PORT } from './config/envConfig';


const app = express();
const port = 9000
app.use(express.json({ limit: "20mb" }));
app.use(routes)

app.all('*', async (req, res, next) => res.status(404).send({ message: 'Not found' }));

app.listen(PORT, async () => {
    await AppDataSource.initialize().then(async () => { console.log("Databases connected successfully!"); }).catch((err:any) => console.log("Error connecting databases", err));
    console.log(`Server listing on port ${PORT}`);
})