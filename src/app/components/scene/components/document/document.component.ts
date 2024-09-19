import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { IDocument } from '../../types/document';
import { SceneViewService } from '../../services/scene-view.service';

@Component({
  selector: 'at-document',
  standalone: true,
  imports: [],
  templateUrl: './document.component.html',
  styleUrl: './document.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent {
  value: InputSignal<IDocument> = input({
    id: 0,
    width: 0,
    height: 0,
  });
  constructor(public sceneViewService: SceneViewService) {}

  transformStyle: Signal<string> = computed((): string => {
    return 'scale(' + this.sceneViewService.view().scale + ')';
  });
}
