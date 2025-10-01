import { PaymentStrategy } from './PaymentStrategy';
export class PaymentContext {
    constructor(private strategy: PaymentStrategy) {}
    setStrategy(strategy: PaymentStrategy): void {
        this.strategy = strategy;
    }
    executePayment(amount: number): void {
        this.strategy.pay(amount);
    }
}
