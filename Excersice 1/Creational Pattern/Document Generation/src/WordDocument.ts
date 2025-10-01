import { Document } from './Document';
export class WordDocument extends Document {
    open(): void {
        console.log('Opening Word document...');
    }
    save(): void {
        console.log('Saving Word document...');
    }
}
