import * as readlineSync from 'readline-sync';
import { CreditCardPayment } from './CreditCardPayment';
import { PayPalPayment } from './PayPalPayment';
import { PaymentContext } from './PaymentContext';
console.log('Select payment method:');
console.log('1. Credit Card');
console.log('2. PayPal');
const choice = parseInt(readlineSync.question('Enter choice (1 or 2): '), 10);
let context: PaymentContext;
if (choice === 1) {
    const cardNumber = readlineSync.question('Enter your credit card number: ');
    const amount = parseFloat(readlineSync.question('Enter amount to pay: '));
    const strategy = new CreditCardPayment(cardNumber);
    context = new PaymentContext(strategy);
    context.executePayment(amount);
} else if (choice === 2) {
    const email = readlineSync.question('Enter your PayPal email: ');
    const amount = parseFloat(readlineSync.question('Enter amount to pay: '));
    const strategy = new PayPalPayment(email);
    context = new PaymentContext(strategy);
    context.executePayment(amount);
} else {
    console.log('Invalid choice!');
}
