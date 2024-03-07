import express , { Application } from "express"
import bodyParser from "body-parser"
import { AppDataSource } from "./data-source"
import userRoutes from "./routes/userRoutes";
import laptopRoutes from "./routes/laptopRoutes";
import passport from 'passport';
import configurePassport from './config/passport';
import dotenv from "dotenv";

AppDataSource.initialize().then(async () => {
    dotenv.config();
    const APP_PORT = process.env.APP_PORT || 5000;
    configurePassport(passport);
    const app : Application = express();
    app.use(passport.initialize());
    app.use(bodyParser.json())
    app.use(userRoutes);
    app.use(laptopRoutes);
    app.listen(APP_PORT)
    console.log(`Express server has started, Open http://localhost:${APP_PORT} to see results`)

}).catch(error => console.log(error));