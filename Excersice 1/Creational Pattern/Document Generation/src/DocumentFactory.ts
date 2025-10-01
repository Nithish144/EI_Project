import { Document } from './Document';
import { WordDocument } from './WordDocument';
import { PDFDocument } from './PDFDocument';
export class DocumentFactory {
    static createDocument(type: string): Document | null {
        if (type === 'word') {
            return new WordDocument();
        } else if (type === 'pdf') {
            return new PDFDocument();
        } else {
            console.log('Unknown document type!');
            return null;
        }
    }
}
