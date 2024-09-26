import 'reflect-metadata';
import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {podRegistry} from './di/container';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export class FrameworkServer {
    private app: express.Application;

    constructor() {
        this.app = express();
    }

    public setup(controllers: any[],
                 options: {
                     port?: number;
                     customMiddleware?: (app: Application) => void;
                     enableCors?: boolean;
                     enableLogging?: boolean;
                 } = {}) {
        this.configureDefaults(options.enableCors, options.enableLogging);

        controllers.forEach(controller => {
            try {
                // const instance = podRegistry.get(controller);
                this.setupRoutes(controller);
            } catch (error) {
                console.error(`Error registering controller ${controller.name}:`, error);
            }
        });

        if (options.customMiddleware) {
            options.customMiddleware(this.app);
        }

        const port = options.port || process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }

    private configureDefaults(enableCors = false, enableLogging = false) {
        this.app.use(express.json());
        if (enableCors) this.app.use(cors());
        if (enableLogging) this.app.use(morgan('combined'));

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err);
            res.status(500).json({error: 'Internal Server Error'});
        });
    }

    private setupRoutes(controllerClass: any) {
        const controllerInstance = podRegistry.get(controllerClass);
        const prefix = Reflect.getMetadata('prefix', controllerClass);
        const routes: Array<{ method: HttpMethod; path: string; handlerName: string }> =
            Reflect.getMetadata('routes', controllerClass) || [];

        routes.forEach((route) => {
            // if (!['get', 'post', 'put', 'delete', 'patch'].includes(route.method)) {
            if (!['get', 'post'].includes(route.method)) {
                throw new Error(`Invalid HTTP method: ${route.method}`);
            }
            this.app[route.method](`${prefix}${route.path}`, async (req, res, next) => {
                try {
                    await controllerInstance[route.handlerName](req, res);
                } catch (error) {
                    next(error);
                }
            });
        });
    }
}
