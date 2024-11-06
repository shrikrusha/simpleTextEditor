import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent {
  @ViewChild('editorRef', { static: true }) editorRef!: ElementRef;

  fontSizes = ['10', '12', '14', '16', '18', '20', '24'];
  fontFamilies = ['Arial', 'Courier', 'Georgia', 'Times New Roman', 'Verdana'];
  searchText = '';
  replaceText = '';
  currentZoom = 1;

  // Fixing unwanted characters on paste
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text/plain');
      const cleanedText = pastedText.replace(/a{8}/g, ''); // Removes 'aaaaaaaa' if present
      document.execCommand('insertText', false, cleanedText);
      event.preventDefault();
    }
  }

  // General text formatting
  format(command: string) {
    document.execCommand(command);
  }

  // Undo / Redo
  undo() {
    document.execCommand('undo');
  }

  redo() {
    document.execCommand('redo');
  }

  // Search and replace text
  search() {
    const content = this.editorRef.nativeElement.innerHTML;
    const regex = new RegExp(this.searchText, 'gi');
    this.editorRef.nativeElement.innerHTML = content.replace(regex, `<mark>${this.searchText}</mark>`);
  }

  replace() {
    const content = this.editorRef.nativeElement.innerHTML;
    const regex = new RegExp(this.searchText, 'gi');
    this.editorRef.nativeElement.innerHTML = content.replace(regex, this.replaceText);
  }
  // Save content as DOC
  saveAsDoc() {
    const content = this.editorRef.nativeElement.innerHTML;
    const blob = new Blob(['<html><body>' + content + '</body></html>'], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.doc';
    link.click();
  }

  // Save content as PDF
  saveAsPdf() {
    const content = this.editorRef.nativeElement.innerHTML;
    const doc = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(doc);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    link.click();
  }
}
