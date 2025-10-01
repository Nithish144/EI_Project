import { PaymentStrategy } from './PaymentStrategy';
export class PayPalPayment implements PaymentStrategy {
    constructor(private email: string) {}
    pay(amount: number): void {
        console.log(`Paid $${amount} using PayPal account: ${this.email}`);
    }
}
