import { Injectable, signal, WritableSignal } from '@angular/core';
import { IAnnotation } from '../types/annotation';
import { AnnotationHelpersService } from './annotation-helpers.service';
import { INITIAL_SCENE_VIEW, ISceneView } from '../types/scene';
import { DocumentHelpersService } from './document-helpers.service';
import { IDocument, IDocumentMeta } from '../types/document';

@Injectable({
  providedIn: 'root',
})
export class SceneViewService {
  public annotationCollection: IAnnotation[] = [];
  public documentCollection: IDocument[] = [];
  public documentMeta: Map<number, WritableSignal<IDocumentMeta>> = new Map();

  public view = signal<ISceneView>(INITIAL_SCENE_VIEW);
  constructor(
    private annotationHelpersService: AnnotationHelpersService,
    private documentHelpersService: DocumentHelpersService,
  ) {
    this.documentCollection = this.documentHelpersService.MOCDocumentCollection;
    this.initDocMeta();
  }

  initDocMeta() {
    this.documentCollection.forEach((doc) => {
      this.documentMeta.set(
        doc.id,
        signal<IDocumentMeta>(this.documentHelpersService.documentMeta(doc.id)),
      );
    });
  }
  setDocMeta() {
    this.documentCollection.forEach((doc) => {
      this.documentMeta
        .get(doc.id)
        ?.set(this.documentHelpersService.documentMeta(doc.id));
    });
  }
  onSceneClick(event: PointerEvent): void {
    const target = event.target as HTMLElement;
    if (this.annotationHelpersService.isAnnotationElement(target)) {
      return;
    }
    if (this.documentHelpersService.isDocumentElement(target)) {
      this.annotationCollection?.push(
        this.annotationHelpersService.generatedAnnotation(
          event.pageY -
            (this.documentHelpersService.documentElement(target)?.offsetTop ||
              0),
          event.pageX -
            (this.documentHelpersService.documentElement(target)?.offsetLeft ||
              0),
          this.documentHelpersService.documentIdByElement(target),
        ),
      );
    }
  }
  removeAnnotation(unnecessary: IAnnotation) {
    if (!unnecessary) {
      throw 'remove empty annotation';
    }
    this.annotationCollection = this.annotationCollection.filter(
      (a) => a.id !== unnecessary?.id,
    );
  }

  updateScale(delta: number): void {
    this.view.update((v) => ({
      scale: (v.scale + delta * 0.001)
    }) as ISceneView);
  }
}
