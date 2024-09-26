import 'reflect-metadata';
import { FrameworkServer } from '../../../src';
import { MyController } from './controllers/MyController';

const app = new FrameworkServer();

app.setup([
    MyController
], {
    port: 4000,
});
