import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener, AfterViewInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SceneViewService } from './services/scene-view.service';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { IAnnotation } from './types/annotation';
import { JsonPipe } from '@angular/common';
import { AnnotationHelpersService } from './services/annotation-helpers.service';
import {DocumentComponent} from "./components/document/document.component";

@Component({
  selector: 'at-scene',
  standalone: true,
  imports: [RouterOutlet, AnnotationComponent, JsonPipe, DocumentComponent],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements AfterViewInit{

  @HostListener('document:click', ['$event']) onClickEvent(
    event: PointerEvent,
  ): void {
    this.sceneViewService.onSceneClick(event);
  }
  @HostListener('window:resize', ['$event']) onComponentResize() {
    this.sceneViewService.setDocMeta();
  }

  ngAfterViewInit(){
    this.sceneViewService.setDocMeta();
  }
  constructor(
    public sceneViewService: SceneViewService,
  ) {}
}
