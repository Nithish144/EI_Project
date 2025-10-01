import { Document } from './Document';
export class PDFDocument extends Document {
    open(): void {
        console.log('Opening PDF document...');
    }
    save(): void {
        console.log('Saving PDF document...');
    }
}
