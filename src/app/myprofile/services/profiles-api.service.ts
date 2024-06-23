import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer peticiones HTTP
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Profile} from "../pages/profile.entity";

@Injectable({
  providedIn: 'root'
})
export class ProfilesApiService {

  private apiUrl = 'assets/profiles.json'; // Ruta al archivo JSON (debes ajustarla según tu estructura de archivos)

  constructor(private http: HttpClient) { }

  getAgentProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl).pipe(
      map((profiles: any[]) => profiles.map(profile => this.mapToProfile(profile)))
    );
  }

  getAgentProfileById(id: string): Observable<Profile | undefined> {
    return this.http.get<Profile[]>(this.apiUrl).pipe(
      map((profiles: any[]) => profiles.find(profile => profile.id === id)),
      map(profile => profile ? this.mapToProfile(profile) : undefined)
    );
  }

  private mapToProfile(data: any): Profile {
    let profile = new Profile();
    profile.setProfileId(data.id);
    profile.setBiography(data.biography);
    profile.setProfileImageUrl(data.profile_image_url);
    profile.setSocialLinks(data.social_links);
    return profile;
  }
}
