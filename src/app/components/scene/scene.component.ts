import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { IAnnotation } from './types/annotation';
import { JsonPipe } from '@angular/common';
import { AnnotationHelpersService } from './services/annotation-helpers.service';

@Component({
  selector: 'at-scene',
  standalone: true,
  imports: [RouterOutlet, AnnotationComponent, JsonPipe],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent {
  public annotationCollection?: IAnnotation[] = [];
  @HostListener('document:click', ['$event']) onClickEvent(
    event: MouseEvent,
  ): void {
    console.log('C', event);
    this.annotationCollection?.push(
      this.annotationHelpersService.generatedAnnotation(
        event.pageX,
        event.pageY,
      ),
    );
  }

  constructor(
    public annotationHelpersService: AnnotationHelpersService,
  ) {}
}
