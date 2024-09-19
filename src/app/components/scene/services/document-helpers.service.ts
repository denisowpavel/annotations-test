import { Injectable, signal, WritableSignal } from '@angular/core';
import { IDocument, IDocumentMeta } from '../types/document';
import { CommonHelpersService } from './common-helpers.service';

@Injectable({
  providedIn: 'root',
})
export class DocumentHelpersService {
  constructor(private commonHelpersService: CommonHelpersService) {}

  isDocumentElement(element: HTMLElement): boolean {
    return this.commonHelpersService.containsClass(element, 'document-area');
  }

  documentElement(element: HTMLElement): HTMLElement | null {
    if (!element.parentElement) {
      return null;
    }
    return element?.classList.contains('document-area')
      ? element
      : this.documentElement(element.parentElement);
  }

  documentIdByElement(element: HTMLElement): number {
    const doc = this.documentElement(element);
    if (!doc) {
      return -1;
    }
    return +doc.id.replace('document-', '');
  }
  get MOCDocumentCollection(): IDocument[] {
    return [
      { id: this.commonHelpersService.generatedId, width: 794, height: 1123 },
      { id: this.commonHelpersService.generatedId, width: 794, height: 1123 },
      { id: this.commonHelpersService.generatedId, width: 794, height: 1123 },
    ];
  }

  documentMeta(id: number): IDocumentMeta {
    const docElement: HTMLElement | null = document.querySelector(`.document-area#document-${id}`);
    if (!docElement) {
      return {
        offsetLeft: 0,
        offsetTop: 0,
      } as IDocumentMeta;
    }
    return {
      offsetLeft: docElement.offsetLeft,
      offsetTop: docElement.offsetTop,
    } as IDocumentMeta;
  }
}
