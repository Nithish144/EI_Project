import { ISubject } from './ISubject';
import { IObserver } from './IObserver';
export class Stock implements ISubject {
    private observers: IObserver[] = [];
    private price: number;
    constructor(private name: string, initialPrice: number) {
        this.price = initialPrice;
    }
    registerObserver(observer: IObserver): void {
        this.observers.push(observer);
    }
    removeObserver(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this.name, this.price);
        }
    }
    setPrice(newPrice: number): void {
        this.price = newPrice;
        this.notifyObservers();
    }
}
