import * as readlineSync from 'readline-sync';
import { DocumentFactory } from './DocumentFactory';
import { Document } from './Document';
console.log('Document types: word, pdf');
const type = readlineSync.question('Enter document type to create: ').toLowerCase();
const doc: Document | null = DocumentFactory.createDocument(type);
if (doc) {
    doc.open();
    doc.save();
}
