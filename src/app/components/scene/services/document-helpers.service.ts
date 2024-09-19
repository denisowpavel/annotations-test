import { Injectable } from '@angular/core';
import { IDocument } from '../types/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentHelpersService {

  constructor() {}

  get MOCDocumentCollection(): IDocument[] {
    return [
      { id: 1, width: 794, height: 1123 },
      { id: 3, width: 794, height: 1123 },
      { id: 3, width: 794, height: 1123 },
    ];
  }
}
