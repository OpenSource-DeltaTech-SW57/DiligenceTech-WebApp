export class SignUpRequest {
  constructor(public username: string, public email: string, public password: string, public firstname: string, public lastname: string ,public roles: Array<string> = ['ROLE_USER']) {}
}
