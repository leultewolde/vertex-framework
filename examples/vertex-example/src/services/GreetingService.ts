import { Service } from "vertex-framework/dist/src";

@Service()
export class GreetingService {
  getMessage() {
    return "Hello from GreetingService!";
  }
}
