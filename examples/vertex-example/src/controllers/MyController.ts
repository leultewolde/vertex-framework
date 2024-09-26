import {Controller, Get} from '../../../../src';
import {GreetingService} from '../services/GreetingService';
import {Inject} from "../../../../src/decorators/inject";

@Controller('/api')
export class MyController {

    @Inject(GreetingService)
    private greetingService!: GreetingService;

    @Get('/hello')
    getHello(req: any, res: { json: (arg0: { message: string; }) => void; }) {
        const message = this.greetingService.getMessage();
        res.json({message});
    }
}
