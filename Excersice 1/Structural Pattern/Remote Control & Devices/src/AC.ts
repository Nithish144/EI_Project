import { IDevice } from './IDevice';
export class AC implements IDevice {
    turnOn(): void {
        console.log('AC is turned ON');
    }
    turnOff(): void {
        console.log('AC is turned OFF');
    }
}
