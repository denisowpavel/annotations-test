import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  InputSignal,
  OnInit, output, OutputEmitterRef,
  Signal,
} from '@angular/core';
import { IAnnotation } from '../../types/annotation';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'at-annotation',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationComponent {
  value: InputSignal<IAnnotation> = input({
    id: 0,
    documentID: 0,
    view: {
      top: 0,
      left: 0,
      color: '#F00',
    },
  });
  remove: OutputEmitterRef<IAnnotation> = output()
  currentSlotTop: Signal<number> = computed((): number => {
    return this.value().view.top;
  });

  currentSlotLeft: Signal<number> = computed((): number => {
    return this.value().view.left;
  });

}
