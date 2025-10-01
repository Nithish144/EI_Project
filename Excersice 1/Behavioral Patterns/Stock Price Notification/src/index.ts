import * as readlineSync from 'readline-sync';
import { Stock } from './Stock';
import { Investor } from './Investor';
const stockName = readlineSync.question('Enter stock name: ');
const initialPrice = parseFloat(readlineSync.question('Enter initial stock price: '));
const stock = new Stock(stockName, initialPrice);
const investorCount = parseInt(readlineSync.question('How many investors to register? '), 10);
const investors: Investor[] = [];
for (let i = 0; i < investorCount; i++) {
    const name = readlineSync.question(`Enter name of investor ${i + 1}: `);
    const investor = new Investor(name);
    investors.push(investor);
    stock.registerObserver(investor);
}
const newPrice = parseFloat(readlineSync.question(`Enter new price for ${stockName}: `));
stock.setPrice(newPrice);
