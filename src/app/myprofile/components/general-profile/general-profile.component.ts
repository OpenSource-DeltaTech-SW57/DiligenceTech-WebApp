import {Component, OnInit} from '@angular/core';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import {Agent} from "../../model/agent.entity";
import {AgentApiService} from "../../services/agent-api.service";

@Component({
  selector: 'app-general-profile',
  templateUrl: './general-profile.component.html',
  styleUrl: './general-profile.component.scss'
})
export class GeneralProfileComponent implements OnInit {
  isToggled = false;
  agent: Agent = new Agent();

  constructor(
      public themeService: CustomizerSettingsService,
      private agentApiService: AgentApiService
  ) {
      this.themeService.isToggled$.subscribe(isToggled => {
          this.isToggled = isToggled;
      });
  }

  ngOnInit(): void {
        this.agentApiService.getAgentByCode(String(localStorage.getItem('email'))).subscribe((response:any)=>{
          this.agent = response;
        });
    }

  // RTL Mode
  toggleRTLEnabledTheme() {
      this.themeService.toggleRTLEnabledTheme();
  }

}
