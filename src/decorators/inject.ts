import { podRegistry } from '../di/container';

export function Inject(pod: any): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const backingField = `__${String(propertyKey)}`;
        Object.defineProperty(target, propertyKey, {
            get: function () {
                if (!this[backingField]) {
                    this[backingField] = podRegistry.get(pod);
                }
                return this[backingField];
            },
            enumerable: true,
            configurable: true,
        });
    };
}
