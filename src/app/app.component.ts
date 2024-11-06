import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextEditorComponent } from './text-editor/text-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TextEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'text-editor';
}
