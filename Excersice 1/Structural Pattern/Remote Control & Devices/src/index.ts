import * as readlineSync from 'readline-sync';
import { RemoteControl } from './RemoteControl';
import { TV } from './TV';
import { AC } from './AC';
console.log('Select device:');
console.log('1. TV');
console.log('2. AC');
const deviceChoice = parseInt(readlineSync.question('Enter choice: '), 10);
let device;
if (deviceChoice === 1) {
    device = new TV();
} else if (deviceChoice === 2) {
    device = new AC();
} else {
    console.log('Invalid choice!');
    process.exit(0);
}
const remote = new RemoteControl(device);
console.log('Press 1 to turn ON, 2 to turn OFF');
const action = parseInt(readlineSync.question('Enter choice: '), 10);

if (action === 1) {
    remote.pressOn();
} else if (action === 2) {
    remote.pressOff();
} else {
    console.log('Invalid choice!');
}
