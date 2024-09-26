import { Service } from "vertex-framework";

@Service()
export class GreetingService {
  getMessage() {
    return "Hello from GreetingService!";
  }
}
