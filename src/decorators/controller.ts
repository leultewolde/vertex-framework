import { podRegistry } from "../di/container";

export function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    podRegistry.register(target, null);
    Reflect.defineMetadata("prefix", prefix, target);
  };
}
