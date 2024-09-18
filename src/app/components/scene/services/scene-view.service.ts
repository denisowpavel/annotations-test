import { Injectable } from '@angular/core';
import { IAnnotation } from '../types/annotation';
import { AnnotationHelpersService } from './annotation-helpers.service';

@Injectable({
  providedIn: 'root',
})
export class SceneViewService {
  public annotationCollection?: IAnnotation[] = [];
  constructor(private annotationHelpersService: AnnotationHelpersService) {}

  onSceneClick(event: PointerEvent): void {
    if (
      this.annotationHelpersService.isAnnotationElement(
        event.target as HTMLElement,
      )
    ) {
      return;
    }
    this.annotationCollection?.push(
      this.annotationHelpersService.generatedAnnotation(
        event.pageX,
        event.pageY,
      ),
    );
  }
  removeAnnotation(unnecessary: IAnnotation) {
    if(!unnecessary){
      throw 'remove empty annotation'
    }
    this.annotationCollection = this.annotationCollection?.filter(a => a.id !== unnecessary?.id)
  }
}
