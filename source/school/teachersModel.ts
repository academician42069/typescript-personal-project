export interface ITeachersModelScheme {
    teacherMap: Map<string, ITeacherScheme>;
}

interface IEmail {
    email: string;
    primary: boolean;
}

interface IPhone {
    phone: string;
    primary: boolean;
}

interface ISubject {
    subject: string;
}

export interface ITeacherScheme {
    name: {
        first: string;
        last: string;
    };
    image: string;
    dateOfBirth: string;
    emails: IEmail[];
    phones: IPhone[];
    sex: string;
    subjects: ISubject[];
    description?: string;
    id?: string;
}

export class TeachersModel implements ITeachersModelScheme {

    public teacherMap: Map<string, ITeacherScheme>;

    constructor() {
        this.teacherMap = new Map();
    }

    public add(obj: ITeacherScheme): string {
        const date = new Date();
        obj.id = obj.name.first + obj.name.last + String(60 * date.getTime());
        this.teacherMap.set(obj.id, obj);
        return obj.id;
    }

    public read(id: string): ITeacherScheme {
        const thisTeacher = this.teacherMap.get(id);
        if (thisTeacher !== undefined) {
            return thisTeacher;
        } else {
            throw Error ("There is no teacher with this ID.");
        }
    }

    public update(id: string, update: ITeacherScheme): Map<string, ITeacherScheme> {
        return this.teacherMap.set(id, update);
    }

    public remove(id: string): boolean {
        return this.teacherMap.delete(id);
    }

}
