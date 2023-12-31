import { UploadFile } from "./uploadfile.model";

export class NewOt {
    ot: string;
    name: string;
    names: string[];
    files:  File[];
    constructor(ot: string, name: string, names: string[], files:  File[]) {
        this.ot = ot;
        this.name = name;
        this.names = names;
        this.files = files;
    }
}