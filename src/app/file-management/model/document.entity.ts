export class Document {
  id: number;
  folderId: number;
  filename: string;
  fileUrl: string;

  constructor() {
    this.id = 0;
    this.folderId = 0;
    this.filename = '';
    this.fileUrl = '';
  }
}
