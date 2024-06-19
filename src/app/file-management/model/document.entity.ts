export class Document {
  id: number;
  folderId: number;
  filename: string;
  file_url: string;

  constructor() {
    this.id = 0;
    this.folderId = 0;
    this.filename = '';
    this.file_url = '';
  }
}
