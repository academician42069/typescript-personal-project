interface ISubjectsModelCreationScheme {
    title: string;
    lessons: number;
    description?: string;
}

export interface ISubjectsModelScheme {
    title: string;
    lessons: number;
    id: string;
    description?: string;
}

export class SubjectsModel implements ISubjectsModelScheme {

    public title: string;
    public lessons: number;
    public id: string;
    public description?: string;

    constructor(metadataObj: ISubjectsModelCreationScheme) {
        const date = new Date();
        this.title = metadataObj.title;
        this.lessons = metadataObj.lessons;
        this.id = this.title + String(31 * this.lessons + date.getTime());
        if (typeof metadataObj.description === "string") {
            this.description = metadataObj.description;
        }
    }

}
