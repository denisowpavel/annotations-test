import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'at-scene',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent {}
