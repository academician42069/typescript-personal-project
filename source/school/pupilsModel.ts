interface IPhone {
    phone: string;
    primary: boolean;
}

export interface IPupilScheme {
    dateOfBirth: string;
    description?: string;
    id?: string;
    image: string;
    name: {
        first: string,
        last: string,
    };
    phones: IPhone[];
    sex: string;
}

export interface IPupilsModelScheme {
    pupilMap: Map<string, IPupilScheme>;
}

export class PupilsModel implements IPupilsModelScheme {

    public pupilMap: Map<string, IPupilScheme>;

    constructor() {
        this.pupilMap = new Map();
    }

    public add(obj: IPupilScheme): string {
        const date = new Date();
        obj.id = obj.name.first + obj.name.last + String(73 * date.getTime());
        this.pupilMap.set(obj.id, obj);
        return obj.id;
    }

    public read(id: string): IPupilScheme {
        const thisPupil = this.pupilMap.get(id);
        if (thisPupil !== undefined) {
            if (thisPupil.id === undefined) {
                thisPupil.id = id;
            }
            return thisPupil;
        } else {
            throw Error ("There is no pupil with this ID.");
        }
    }

    public update(id: string, update: IPupilScheme): Map<string, IPupilScheme> {
        return this.pupilMap.set(id, update);
    }

    public remove(id: string): boolean {
        const thisPupil = this.pupilMap.get(id);
        if (thisPupil !== undefined) {
            return this.pupilMap.delete(id);
        } else {
            throw Error ("There is no pupil with this ID.");
        }
    }
}
