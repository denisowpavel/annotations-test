import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { IDocument } from '../../types/document';

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
}
