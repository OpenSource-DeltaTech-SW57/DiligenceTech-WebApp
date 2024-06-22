export class Profile{
  id: string;
  biography: string;
  profile_image_url: string;
  social_links: {
    [key: string]: string;
  };

  constructor() {
    this.id = "";
    this.biography = "";
    this.profile_image_url = "";
    this.social_links = {};
  }

  getProfileId(): string {
    return this.id;
  }

  getBiography(): string {
    return this.biography;
  }

  getProfileImageUrl(): string {
    return this.profile_image_url;
  }

  getSocialLinks(): { [key: string]: string } {
    return this.social_links;
  }

  setBiography(biography: string): void {
    this.biography = biography;
  }

  setProfileImageUrl(profile_image_url: string): void {
    this.profile_image_url = profile_image_url;
  }

  setSocialLinks(social_links: { [key: string]: string }): void {
    this.social_links = social_links;
  }

  setProfileId(id: string): void {
    this.id = id;
  }

  getSocialLink(key: string): string {
    return this.social_links[key];
  }

setSocialLink(key: string, value: string): void {
    this.social_links[key] = value;
  }

  removeSocialLink(key: string): void {
    delete this.social_links[key];
  }


}
