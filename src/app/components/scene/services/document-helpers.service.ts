import { Injectable } from '@angular/core';
import { IDocument } from '../types/document';
import { CommonHelpersService } from './common-helpers.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentHelpersService {
  constructor(private commonHelpersService: CommonHelpersService) {}

  isDocumentElement(element: HTMLElement): boolean {
    return this.commonHelpersService.containsClass(element, 'document-area');
  }

  documentIdByElement(element: HTMLElement): number {
    if (!element.parentElement) {
      return -1;
    }
    return element?.classList.contains('document-area')
      ? +element.id
      : this.documentIdByElement(element.parentElement);
  }

  get MOCDocumentCollection(): IDocument[] {
    return [
      { id: this.commonHelpersService.generatedId, width: 794, height: 1123 },
      { id: this.commonHelpersService.generatedId, width: 794, height: 1123 },
      { id: this.commonHelpersService.generatedId, width: 794, height: 1123 },
    ];
  }
}
