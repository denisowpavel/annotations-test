import { Injectable } from '@angular/core';
import { randomColors } from './random-values';
import { IAnnotation } from '../types/annotation';
import {LogicalFileSystem} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root',
})
export class AnnotationHelpersService {
  generatedAnnotation(left: number, top: number): IAnnotation {
    return {
      id: this.generatedId,
      documentID: 0,
      view: {
        color: this.generatedColor,
        top,
        left,
      },
    };
  }
  get generatedId(): number {
    return Math.floor(Math.random() * 999999999999);
  }
  get generatedColor(): string {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  }

  isAnnotationElement(element: HTMLElement): boolean{
    if(!element.parentElement){
      return false;
    }
    return element?.classList.contains('annotation-drag-area') || this.isAnnotationElement(element.parentElement)
  }

  constructor() {}
}
