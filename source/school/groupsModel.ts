import { IPupilScheme } from "./pupilsModel";

export interface IGroupObjScheme {
    id: string;
    room: number;
}

export interface IGroupsModelScheme {
    groupMap: Map<string, IGroupObjScheme>;
    pupilMap: Map<string, IPupilScheme>;
}

export class GroupsModel implements IGroupsModelScheme {

    public groupMap: Map<string, IGroupObjScheme>;
    public pupilMap: Map<string, IPupilScheme>;

    constructor() {
        this.groupMap = new Map();
        this.pupilMap = new Map();
    }

    public add(roomNumber: number): string {
        const date = new Date();
        const id: string = String(roomNumber * 31 * date.getTime());
        const groupObj = {
            id,
            room: roomNumber,
        };
        this.groupMap.set(id, groupObj);
        return id;
    }

    public addPupil(groupID: string, pupil: IPupilScheme): void {
        const pupilGroup = this.groupMap.get(groupID);
        if (pupilGroup === undefined) {
            throw Error ("This group does not exist.");
        } else {
            if (pupil.id === undefined) {
                throw Error ("Il n'y a pas la ecoliere");
            } else {
                this.pupilMap.set(pupil.id, pupil);
            }
        }
    }

    public removePupil(groupID: string, pupilID: string): void {
        const pupilGroup = this.groupMap.get(groupID);
        const thisPupil = this.pupilMap.get(pupilID);
        if (pupilGroup === undefined) {
            throw Error ("This group does not exist.");
        }
        if (thisPupil === undefined ) {
            throw Error ("This pupil does not exist.");
        }
        this.pupilMap.delete(pupilID);
    }

    public update(groupID: string, newRoom: {room: number}): void {
        const pupilGroup = this.groupMap.get(groupID);
        if (pupilGroup === undefined) {
            throw Error ("This group does not exist.");
        }
        pupilGroup.room = newRoom.room;
    }

    public read(groupID: string): IGroupObjScheme {
        const readGroup = this.groupMap.get(groupID);
        if (readGroup === undefined ) {
            throw Error ("Invalid group ID.");
        }
        return readGroup;
    }

    public readAll(): IGroupObjScheme[] {
        const tempArray: IGroupObjScheme[] = [];
        this.groupMap.forEach((value) => {
            tempArray.push(value);
        });
        return tempArray;
    }
}
