import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  Signal,
  WritableSignal,
} from '@angular/core';
import { IAnnotation } from '../../types/annotation';
import { JsonPipe } from '@angular/common';
import { SceneViewService } from '../../services/scene-view.service';
import { IDocument, IDocumentMeta } from '../../types/document';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'at-annotation',
  standalone: true,
  imports: [JsonPipe, FormsModule],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationComponent implements OnInit {
  value: InputSignal<IAnnotation> = input({
    id: 0,
    documentID: 0,
    view: {
      top: 0,
      left: 0,
      color: '#F00',
    },
  });
  remove: OutputEmitterRef<IAnnotation> = output();
  update: OutputEmitterRef<IAnnotation> = output();
  docMeta?: WritableSignal<IDocumentMeta>;
  documentData?: IDocument;
  constructor(public sceneViewService: SceneViewService) {}
  ngOnInit() {
    this.docMeta = this.sceneViewService.documentMeta.get(
      this.value().documentID,
    );
    this.documentData = this.sceneViewService.documentCollection?.find(
      (d) => d.id === this.value().documentID,
    );
  }

  currentTop: Signal<number> = computed((): number => {
    if (!this.docMeta || !this.documentData) {
      throw 'document meta or document not find';
    }
    const scaleStep =
      (this.documentData.height / 2) * (this.sceneViewService.view().scale - 1);
    const scaleCoefficient = // for transform zoom only
      (this.value().view.top - this.documentData.height) /
        (this.documentData.height / 2) +
      1;
    const scaleShift = scaleStep * scaleCoefficient;
    return this.value().view.top + scaleShift + this.docMeta().offsetTop;
  });

  currentLeft: Signal<number> = computed((): number => {
    if (!this.docMeta || !this.documentData) {
      throw 'document meta or document not find';
    }
    const scaleStep =
      (this.documentData.width / 2) * (this.sceneViewService.view().scale - 1);
    const scaleCoefficient = // for transform zoom only
      (this.value().view.left - this.documentData.width) /
        (this.documentData.width / 2) +
      1;
    const scaleShift = scaleStep * scaleCoefficient;
    return this.value().view.left + scaleShift + this.docMeta().offsetLeft;
  });
  onTextChange(val: string): void {
    this.update.emit({
      ...this.value(),
      content: { ...this.value().content, text: val },
    });
  }
  autoGrowTextZone(e: Event) {
    const target = (e.target as HTMLElement)
    target.style.height = '0px';
    target.style.height = target.scrollHeight  + 'px';
  }

}
