import { Injectable, signal, WritableSignal } from '@angular/core';
import { IAnnotation } from '../types/annotation';
import { AnnotationHelpersService } from './annotation-helpers.service';
import { INITIAL_SCENE_VIEW, ISceneView } from '../types/scene';
import { DocumentHelpersService } from './document-helpers.service';
import { IDocument, IDocumentMeta } from '../types/document';
import { IAnnotationDrag } from '../types/events';

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
      //TODO: fix zoom factor accuracy
      const docId = this.documentHelpersService.documentIdByElement(target);
      const left =
        event.pageX -
        (this.documentHelpersService.documentElement(target)?.offsetLeft || 0);
      const top =
        event.pageY -
        (this.documentHelpersService.documentElement(target)?.offsetTop || 0);
      const documentData = this.documentCollection.find(
        (doc) => doc.id === docId,
      );
      if (!documentData) {
        throw 'no documentData';
      }
      const scaleStepW = (documentData.width / 2) * (this.view().scale - 1);
      const scaleCoefficientW =
        (left - documentData.width) / (documentData.width / 2) + 1;
      const scaleShiftW = scaleStepW * scaleCoefficientW;
      const scaleStepH = (documentData.height / 2) * (this.view().scale - 1);
      const scaleCoefficientH =
        (top - documentData.height) / (documentData.height / 2) + 1;
      const scaleShiftH = scaleStepH * scaleCoefficientH;

      this.annotationCollection?.push(
        this.annotationHelpersService.generatedAnnotation(
          top - scaleShiftH,
          left - scaleShiftW,
          docId,
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

  updateAnnotation(updated: IAnnotation) {
    const updatedIndex = this.annotationCollection.findIndex(
      (a) => a.id === updated?.id,
    );
    if (updatedIndex === -1) {
      throw 'update no annotation';
    }
    this.annotationCollection[updatedIndex].view.color = updated.view.color;
  }
  updatePosition(event: IAnnotationDrag) {
    this.annotationCollection = this.annotationCollection.map((a) => {
      if (a.id !== event.id) {
        return a;
      }
      const doc = this.documentCollection.find(
        (d) => d.id === event.documentID,
      );
      return {
        ...a,
        view: {
          ...a.view,
          top: Math.min(
            Math.max(a.view.top + event.shiftY / this.view().scale, 0),
            doc && 'height' in doc ? doc.height : Infinity,
          ),
          left: Math.min(
            Math.max(a.view.left + event.shiftX / this.view().scale, 0),
            doc && 'width' in doc ? doc.width : Infinity,
          ),
        },
      };
    });
    return;
  }

  updateScale(delta: number): void {
    this.view.update(
      (v) =>
        ({
          scale: v.scale + delta * 0.001,
        }) as ISceneView,
    );
  }
}
