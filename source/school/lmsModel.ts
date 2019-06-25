import { ISubjectsModelScheme } from "./subjectsModel";

export interface ILMSModelScheme {
    subjMap: Map<string, ISubjectsModelScheme>;
}

export class LMSModel implements ILMSModelScheme {

    public subjMap: Map<string, ISubjectsModelScheme>;

    constructor() {
        this.subjMap = new Map();
    }

    public add(subject: ISubjectsModelScheme) {
        if (subject.id !== undefined) {
            this.subjMap.set(subject.id, subject);
        } else {
            throw Error ("There is no subject");
        }
    }

    public remove(subject: ISubjectsModelScheme) {
        if (subject.id !== undefined) {
            this.subjMap.delete(subject.id);
        } else {
            throw Error ("There is no subject");
        }
    }

    public update(subject: ISubjectsModelScheme, update: ISubjectsModelScheme) {
        if (subject.id !== undefined) {
            const tempSubj = this.subjMap.get(subject.id);
            if (tempSubj !== undefined) {
                Object.assign(tempSubj, update);
                this.subjMap.set(subject.id, tempSubj);
            } else {
                throw Error ("There is no subject with this ID");
            }
        } else {
            throw Error ("There is no subject");
        }
    }

    public verify(subject: ISubjectsModelScheme) {
        if (subject.id !== undefined) {
            return this.subjMap.has(subject.id);
        } else {
            throw Error ("There is no subject");
        }
    }

    public readAll() {
        const tempArray: ISubjectsModelScheme[] = [];
        this.subjMap.forEach((value) => {
            tempArray.push(value);
        });
        return tempArray;
    }
}
