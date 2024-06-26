export class Email {
  id: number;
  message: string;
  title: string;
  description: string;
  receiver_email: string;
  sender_email: string;

  constructor() {
    this.id = 0;
    this.message = '';
    this.receiver_email = '';
    this.sender_email = '';
    this.title = '';
    this.description = '';



  }

}
