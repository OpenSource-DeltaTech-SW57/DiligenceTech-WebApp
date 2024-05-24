import { Component, OnInit, OnDestroy } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl } from '@angular/forms';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit, OnDestroy {
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify']
  ];
  emails = new FormControl([]);
  emailList: string[] = ['hello@james.com', 'hello@andy.com', 'hello@mateo.com', 'hello@luca.com', 'hello@sausage.com', 'hello@tomato.com'];
  isToggled = false;
  editorContent = '';

  constructor(protected themeService: CustomizerSettingsService) {
    this.themeService.isToggled$.subscribe(isToggled => this.isToggled = isToggled);
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  toggleRTLEnabledTheme(): void {
    this.themeService.toggleRTLEnabledTheme();
  }

  sendEmail(): void {
    const selectedEmails = this.emails.value;
    const subject = 'Write your subject here';
    const body = this.editorContent;

    console.log('Emails sent to:', selectedEmails);
    console.log('Subject:', subject);
    console.log('Body:', body);

    this.editorContent = '';
    this.emails.reset();
  }
}
