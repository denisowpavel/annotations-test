import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SceneViewService } from './services/scene-view.service';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { JsonPipe } from '@angular/common';
import { DocumentComponent } from './components/document/document.component';

@Component({
  selector: 'at-scene',
  standalone: true,
  imports: [RouterOutlet, AnnotationComponent, JsonPipe, DocumentComponent],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SceneComponent implements AfterViewInit {
  @HostListener('document:click', ['$event']) onClickEvent(
    event: PointerEvent,
  ): void {
    this.sceneViewService.onSceneClick(event);
  }
  @HostListener('window:resize', ['$event']) onComponentResize() {
    this.sceneViewService.setDocMeta();
  }
  @HostListener('document:mousewheel', ['$event']) onScrollEvent(
    event: WheelEvent,
  ): void {
    if (event.shiftKey && event.deltaY !== 0) {
      this.updateScale(event.deltaY);
    }
  }
  @HostListener('document:keydown.+', ['$event']) zoomIn(): void {
    this.updateScale(100);
  }
  @HostListener('document:keydown.-', ['$event']) zoomOut(): void {
    this.updateScale(-100);
  }
  ngAfterViewInit() {
    this.sceneViewService.setDocMeta();
  }
  constructor(public sceneViewService: SceneViewService) {}

  updateScale(delta: number) {
    this.sceneViewService.updateScale(delta);
  }

}
