import {Component, OnInit} from '@angular/core';
import {AgentApiService} from "../../services/agent-api.service";
import {Agent} from "../../model/agent.entity";

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.scss'
})
export class ProfileInformationComponent implements OnInit {
  agent: Agent = new Agent();

  constructor(
    private agentApiService: AgentApiService
  ) { }

  ngOnInit(): void {
    this.agentApiService.getAgentByCode(String(localStorage.getItem('email'))).subscribe((response:any)=>{
      this.agent = response;
    });
  }

}
