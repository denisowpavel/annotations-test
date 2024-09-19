import { Injectable } from '@angular/core';
import { randomColors } from './random-values';
import { IAnnotation } from '../types/annotation';
import {LogicalFileSystem} from "@angular/compiler-cli";
import {CommonHelpersService} from "./common-helpers.service";

@Injectable({
  providedIn: 'root',
})
export class AnnotationHelpersService {
  constructor(private commonHelpersService: CommonHelpersService) {}

  generatedAnnotation(top: number, left: number, documentID: number, ): IAnnotation {
    return {
      id: this.commonHelpersService.generatedId,
      documentID,
      view: {
        color: this.generatedColor,
        top,
        left,
      },
    };
  }

  get generatedColor(): string {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  }

  isAnnotationElement(element: HTMLElement): boolean {
    return this.commonHelpersService.containsClass(
      element,
      'annotation-drag-area',
    );
  }
}
