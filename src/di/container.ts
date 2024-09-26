
class PodRegistry {
    private pods = new Map<any, any>();

    register(pod: any, instance: any = null): void {
        this.pods.set(pod, instance);
        // this.logCurrentPods();
    }

    get(pod: any): any {
        let instance = this.pods.get(pod);
        if (!instance) {
            instance = new pod();
            this.pods.set(pod, instance);
            // this.logCurrentPods();
        }
        return instance;
    }

    private logCurrentPods(): void {
        const podNames = Array.from(this.pods.keys()).map(pod => pod.name);
        console.log(`Current pods in registry: [${podNames.join(', ')}]`);
    }
}

const podRegistry = new PodRegistry();

export { podRegistry };
