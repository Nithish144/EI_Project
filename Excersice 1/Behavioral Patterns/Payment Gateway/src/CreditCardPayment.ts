import { PaymentStrategy } from './PaymentStrategy';
export class CreditCardPayment implements PaymentStrategy {
    constructor(private cardNumber: string) {}
    pay(amount: number): void {
        console.log(`Paid $${amount} using Credit Card: ${this.cardNumber}`);
    }
}
