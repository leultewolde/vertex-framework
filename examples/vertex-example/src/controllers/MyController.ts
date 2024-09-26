import { Controller, Get, Inject } from "vertex-framework";
import { GreetingService } from "../services/GreetingService";

@Controller("/api")
export class MyController {
  @Inject(GreetingService)
  private greetingService!: GreetingService;

  @Get("/hello")
  getHello(req: any, res: { json: (arg0: { message: string }) => void }) {
    const message = this.greetingService.getMessage();
    res.json({ message });
  }
}
