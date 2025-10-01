export interface IObserver {
    update(stockName: string, stockPrice: number): void;
}
