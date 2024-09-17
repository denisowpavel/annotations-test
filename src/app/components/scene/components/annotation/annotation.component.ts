import {ChangeDetectionStrategy, Component, computed, ElementRef, Input, input, OnInit, Signal} from '@angular/core';
import { IAnnotation } from '../../types/annotation';
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'at-annotation',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './annotation.component.html',
  styleUrl: './annotation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationComponent{
  @Input() value!: IAnnotation;

  public currentSlotTop: Signal<number> = computed((): number => {
    return this.value.top;
  });


  public currentSlotLeft: Signal<number> = computed((): number => {
    return this.value.left;
  });

}
