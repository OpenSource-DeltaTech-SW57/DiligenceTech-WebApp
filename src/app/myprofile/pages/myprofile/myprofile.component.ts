import {Component, OnInit} from '@angular/core';
import {Profile} from "../profile.entity";
import {ProfilesApiService} from "../../services/profiles-api.service";
import {Agent} from "../../model/agent.entity";


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent implements OnInit{

  agentData: Agent;
  dataSource!: Mat;


  constructor(private profilesService: ProfilesApiService) {



  }

  ngOnInit(): void {

  }


}
