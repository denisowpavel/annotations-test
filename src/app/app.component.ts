import { Component } from '@angular/core';
import { SceneComponent } from './components/scene/scene.component';

@Component({
  selector: 'at-root',
  standalone: true,
  imports: [SceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
