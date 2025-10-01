import { IDevice } from './IDevice';
export class RemoteControl {
    constructor(private device: IDevice) {}
    pressOn(): void {
        this.device.turnOn();
    }
    pressOff(): void {
        this.device.turnOff();
    }
}
