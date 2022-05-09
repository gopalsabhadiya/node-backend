import express, {Express} from 'express';
import Logger from "./util/Logger";
import bodyParser from 'body-parser';
import cors from 'cors';
import {corsUrl} from "./config/Config";
import RouterConfig from './routes/v1';
import AppMiddlewares from "./config/ErrorHandlerMiddlewares";
import AuthMiddleware from "./auth/AuthMiddleware";
import {autoInjectable, singleton} from "tsyringe";
import ClientToServerEvents from "./service/socket/event/clienttoserver/ClientToServerEvents";
import ServerToClientEvents from "./service/socket/event/ServerToClientEvents";
import InterServerEvents from "./service/socket/event/InterServerEvents";
import SocketServerData from "./service/socket/SocketServerData";
import * as http from "http";
import {Server} from "socket.io";
import {ExtendedError} from "socket.io/dist/namespace";
import SocketClientData from "./service/socket/SocketClientData";

@autoInjectable()
export default class AppWideConfig {

    private app: Express;
    private authMiddleware: AuthMiddleware;
    private isConfigured: boolean;
    private routerConfig: RouterConfig;

    constructor(authMiddleware: AuthMiddleware, routerConfig: RouterConfig) {
        this.app = express();
        this.authMiddleware = authMiddleware;
        this.isConfigured = false;
        this.routerConfig = routerConfig;
    }

    public getConfiguredApp(): http.Server {
        Logger.debug("Returning Configured app");
        process.on('uncaughtException', (e) => {
            Logger.error(e);
        });

        if (this.isConfigured) {
            return http.createServer(this.app);
        }

        this.configureBodyParser();
        this.configureCORS();
        this.attachPreRouterMiddlewares();
        this.configureRouter();
        this.attachErrorMiddleware();

        let server: http.Server = new http.Server(this.app);
        this.openSocketConnection(server);

        this.isConfigured = true;
        return server;

        // return this.app;
    }

    private configureBodyParser() {
        Logger.debug("Configuring Body Parser");
        this.app.use(bodyParser.json({limit: '10mb'}));
        this.app.use(bodyParser.urlencoded({limit: '10mb', extended: true, parameterLimit: 50000}));
    }

    private configureCORS() {
        Logger.debug("Configuring CORS");
        this.app.use(cors({origin: corsUrl, optionsSuccessStatus: 200}));
    }

    private configureCookieParser() {
        Logger.debug("Configuring Cookie Parser");
        const cookieParser = require('cookie-parser');
        this.app.use(cookieParser());
    }

    private attachPreRouterMiddlewares() {
        Logger.debug("Configuring Pre Router Middlewares");
        this.app.use(this.authMiddleware.authMiddleware);
    }

    private configureRouter() {
        Logger.debug("Configuring Router");
        this.app.get('/', (req, res) => {
            res.sendFile(  'C:/Users/admin/Desktop/Gopal/Workspace/demo-projects/chatlook-be/index.html');
        });
        this.app.use('/v1', this.routerConfig.getRouter());
    }

    private attachErrorMiddleware() {
        Logger.debug("Configuring Error Middlewares");
        // catch 404 and forward to error handler
        this.app.use(AppMiddlewares.undefinedRoutesErrorMiddleware);

        // Middleware Error Handler
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.app.use(AppMiddlewares.errorHandlerMiddleware);
    }

    private openSocketConnection(server: http.Server) {
        Logger.debug("Opening socket connection");
        const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketServerData>(server);

        io.sockets.use(this.authMiddleware.socketMiddleware);

        io.sockets.on("connection", function (socket) {

            Logger.debug("client connect: " + socket.data.userId + socket.id);
            let roomId: any;


            socket.on("joinRoom", async (userId: string) => {
                Logger.debug("Joining Room: " + socket.data.userId + ":" + userId);
                socket.join(socket.data.userId + ":" + userId);

                Logger.debug(roomId);
            })

            socket.on("message", (clientData: SocketClientData) => {
                Logger.debug("Broadcasting to Room: " + socket.data.userId + ":" + clientData.userId);
                // io.sockets.in("room").emit('message', 'chat message');
                socket.emit("message", clientData.message);
                socket.to(socket.data.userId + ":" + clientData.userId).emit("message", clientData.message);
            });

            socket.on('disconnect', () => {
                Logger.debug('user disconnected');
            });

        });
        // io.sockets
        // const io = new Server(server);
        // io.on('connection', (socket) => {
        //     console.log('a user connected');
        // });
    }
}