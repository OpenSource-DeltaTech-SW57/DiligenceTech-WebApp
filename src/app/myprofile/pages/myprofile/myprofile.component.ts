import {Component, OnInit} from '@angular/core';
import {Profile} from "../profile.entity";
import {ProfilesApiService} from "../../services/profiles-api.service";


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyprofileComponent implements OnInit{
  profile: Profile | undefined;

  constructor(private profilesService: ProfilesApiService) { }

  ngOnInit(): void {
    this.loadMyProfile();
  }

  private loadMyProfile(): void {
    const myAgentId = '8f790f2f-ff3e-4eb2-a989-47b037a687ee'; // Ejemplo de ID de agente (deberías obtenerlo según la autenticación)
    this.profilesService.getAgentProfileById(myAgentId).subscribe(
      profile => {
        this.profile = profile;
      },
      error => {
        console.error('Error loading profile:', error);
      }
    );
  }
  saveProfileChanges(): void {
    if (this.profile) {
      console.log('Saving profile changes:', this.profile);
    }
  }
}
