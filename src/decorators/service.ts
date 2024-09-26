import {podRegistry} from '../di/container';

export function Service(): ClassDecorator {
    return (target: any) => {
        podRegistry.register(target, null);
    };
}
