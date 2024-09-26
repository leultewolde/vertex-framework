import { Service } from '../../../../src';

@Service()
export class GreetingService {
    getMessage() {
        return 'Hello from GreetingService!';
    }
}