import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import quoteRouter  from './routers/quote.router'

const PORT = 3000;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/quote', quoteRouter)

app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});