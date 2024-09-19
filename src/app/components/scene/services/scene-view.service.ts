import { Injectable, signal } from '@angular/core';
import { IAnnotation } from '../types/annotation';
import { AnnotationHelpersService } from './annotation-helpers.service';
import { INITIAL_SCENE_VIEW, ISceneView } from '../types/scene';
import { DocumentHelpersService } from './document-helpers.service';
import { IDocument } from '../types/document';

@Injectable({
  providedIn: 'root',
})
export class SceneViewService {
  public annotationCollection: IAnnotation[] = [];
  public documentCollection: IDocument[] = [];

  public view = signal<ISceneView>(INITIAL_SCENE_VIEW);
  constructor(
    private annotationHelpersService: AnnotationHelpersService,
    private documentHelpersService: DocumentHelpersService,
  ) {
    this.documentCollection = this.documentHelpersService.MOCDocumentCollection;
  }

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
    if (!unnecessary) {
      throw 'remove empty annotation';
    }
    this.annotationCollection = this.annotationCollection?.filter(
      (a) => a.id !== unnecessary?.id,
    );
  }
}
