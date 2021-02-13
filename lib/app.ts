import * as express from "express";
import * as bodyParser from "body-parser";
import { UserRoutes } from "./routes/userRouter";
import * as mongoose from "mongoose";

class App {

    public app: express.Application = express();
    public routePrv: UserRoutes = new UserRoutes();
    // public mongoUrl: string = 'mongodb://localhost/test';
    public mongoUrl: string = 'mongodb+srv://admin:123@cluster0.qiiz9.mongodb.net/challenge?retryWrites=true&w=majority';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);  
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;
