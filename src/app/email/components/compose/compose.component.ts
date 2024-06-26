import { Component, OnInit, OnDestroy } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl } from '@angular/forms';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {Email} from "../../model/email.entity";
import {EmailApiService} from "../../services/email-api.service";
import {AgentApiService} from "../../../myprofile/services/agent-api.service";
import {an} from "@fullcalendar/core/internal-common";
import {MatFormField} from "@angular/material/form-field";
import {ActivatedRoute, Router} from "@angular/router";
import {EmailRequest} from "../../model/email.request";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit, OnDestroy {


  sentReceiverEmail: string = '';
  sentTitle: string = '';
  sentMessage: string = '';

  emailsData: Email;
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
  isToggled = false;
  editorContent = '';
  dataSource!: MatFormField;

  constructor(
    protected themeService: CustomizerSettingsService,
    private emailApiService: EmailApiService,
    private agentApiService: AgentApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.themeService.isToggled$.subscribe(isToggled => this.isToggled = isToggled);
    this.emailsData = {} as Email;

  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  getAllEmailsList(){

  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  toggleRTLEnabledTheme(): void {
    this.themeService.toggleRTLEnabledTheme();
  }

  sendEmail(): void {
    this.route.params.subscribe(params =>{
      let createEmail = new EmailRequest(String(localStorage.getItem('user')) ,this.sentReceiverEmail,this.sentTitle, this.sentMessage);
      this.emailApiService.create(createEmail).subscribe({
        next:(response)=>{
          console.log(`Email Created: ${response.sender_email} to ${response.receiver_email}`);
          this.router.navigate(['communications/email/sent']);
        },
        error: (error) =>{
          console.error(`Error while creating email: ${error.message}`);
        }
      });
    })
  }
}
