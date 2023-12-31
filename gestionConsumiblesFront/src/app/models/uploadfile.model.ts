export class UploadFile {
    idFolder: string;
    name: string;
    file: File;
    constructor(idFolder: string, name: string, file: File) {
        this.idFolder = idFolder;
        this.name = name;
        this.file = file;
    }
}