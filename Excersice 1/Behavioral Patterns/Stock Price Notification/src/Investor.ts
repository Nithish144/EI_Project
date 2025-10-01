import { IObserver } from './IObserver';
export class Investor implements IObserver {
constructor(private investorName: string) {}
update(stockName: string, stockPrice: number): void {
    console.log(`Investor ${this.investorName} notified: ${stockName} price changed to ${stockPrice}`);
}
}
