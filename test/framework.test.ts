import {strict as assert} from 'assert';
import request from 'supertest';
import {Controller, FrameworkServer, Get, Inject, Service} from '../src';

@Service()
class TestService {
    getMessage() {
        return 'Hello from TestService!';
    }
}

@Controller('/test')
class TestController {
    @Inject(TestService)
    private testService?: TestService;

    @Get('/message')
    getMessage(req: any, res: { json: (arg0: { message: string; }) => void; }) {
        const message = this.testService?.getMessage();
        res.json({message: (message || "Empty")});
    }
}

describe('Framework Tests', () => {
    let app: any;

    before((done) => {
        const frameworkServer = new FrameworkServer();
        frameworkServer.setup([TestController], {port: 4000});
        app = request(frameworkServer['app']);  // Access internal app for testing
        done();
    });

    it('should inject services and respond with the correct message', (done) => {
        app.get('/test/message')
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                assert.equal(res.body.message, 'Hello from TestService!');
                done();
            });
    });

    it('should handle errors for invalid routes', (done) => {
        app.get('/invalid-route')
            .expect(404, done);
    });
});
