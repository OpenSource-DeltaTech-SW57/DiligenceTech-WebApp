export class AuthUsers{
  id: string;
  username: string;
  email: string;
  password: string;
  constructor(){
    this.id = "";
    this.username = "";
    this.email = "";
    this.password = "";
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
