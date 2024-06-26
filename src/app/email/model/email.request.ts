export class EmailRequest{
  constructor(public senderEmail: string, public receiverEmail: string, public title:string, public message: string) {
  }
}
