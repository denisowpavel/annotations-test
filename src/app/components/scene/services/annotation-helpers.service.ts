import { Injectable } from '@angular/core';
import { randomColors } from './random-values';
import { IAnnotation } from '../types/annotation';

@Injectable({
  providedIn: 'root',
})
export class AnnotationHelpersService {
  generatedAnnotation(left: number, top: number): IAnnotation {
    return {
      id: this.generatedId,
      top,
      left,
    };
  }
  get generatedId(): number {
    return Math.floor(Math.random() * 999999999999);
  }
  get generatedColors(): string {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  }

  constructor() {}
}
