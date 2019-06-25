import { IGroupsModelScheme } from "./groupsModel";
import { ILMSModelScheme } from "./lmsModel";
import { ITeachersModelScheme } from "./teachersModel";

interface IRecordScheme {
    pupilId: string;
    teacherId: string;
    subjectId: string;
    lesson: number;
    mark: number;
}

interface IGradebookEntryTemplate {
    level: number;
    records: IRecordScheme[];
}

export class GradebooksModel {

    private group: IGroupsModelScheme;
    private teacher: ITeachersModelScheme;
    private lms: ILMSModelScheme;
    private groupID: string;
    private gradebookMap: Map<string, IGradebookEntryTemplate>;

    constructor(groupObj: IGroupsModelScheme, teacherObj: ITeachersModelScheme, lmsObj: ILMSModelScheme) {
        this.group = groupObj;
        this.teacher = teacherObj;
        this.lms = lmsObj;

        this.gradebookMap = new Map(); // Stores individual gradebooks
    }

    public add(level: number, groupID: string): string {
        const date = new Date();

        const GradebookEntry: IGradebookEntryTemplate = {
            level,
            records: new Array(),
        };

        const gradebookID: string = String((level * 74 ) + 79 * date.getTime());
        this.gradebookMap.set(gradebookID, GradebookEntry);
        this.groupID = groupID;
        return gradebookID;
    }

    public clear(): void {
        return this.gradebookMap.clear();
    }

    public addRecord(gradebookID: string, record: IRecordScheme): number {
        const thisGradebook = this.gradebookMap.get(gradebookID);
        if (thisGradebook !== undefined) {
            return thisGradebook.records.push(record);
        } else {
            throw Error ("This gradebook does not exist");
        }
    }

    public read(gradebookID: string, pupilID: string) {

        const readObj = {
            name: "",
            records: new Array(),
        };

        const recordTemplate = {
            lesson: 0,
            mark: 0,
            subject: "",
            teacher: "",
        };

        const gradebookObj = this.gradebookMap.get(gradebookID);

        if (gradebookObj === undefined) {
            throw Error ("There is no gradebook for this ID");
        }

        const gradebookRecords: IRecordScheme[] = gradebookObj.records;

        for (let i: number = 0; i < gradebookObj.records.length; i++) {
            if (gradebookRecords[i].pupilId === pupilID) {

                const thisPupil = this.group.pupilMap.get(gradebookRecords[i].pupilId);
                const thisTeacher = this.teacher.teacherMap.get(gradebookRecords[i].teacherId);
                const thisLMS = this.lms.subjMap.get(gradebookRecords[i].subjectId);

                if ( (thisPupil === undefined) || (thisTeacher === undefined) || (thisLMS === undefined) ) {
                    throw Error ("Wrong!");
                }

                readObj.name = thisPupil.name.first + " " + thisPupil.name.last;

                recordTemplate.teacher = thisTeacher.name.first + " " + thisTeacher.name.last;
                recordTemplate.subject = thisLMS.title;

                recordTemplate.lesson = gradebookRecords[i].lesson;
                recordTemplate.mark = gradebookRecords[i].mark;

                readObj.records.push(recordTemplate);

                return readObj;
            }
        }

    }

    public readAll(gradebookID: string): object {

        const readObj = {
            name: "",
            records: new Array(),
        };

        const recordTemplate = {
            lesson: 0,
            mark: 0,
            subject: "",
            teacher: "",
        };

        const gradebookObj = this.gradebookMap.get(gradebookID);

        if (gradebookObj === undefined) {
            throw Error ("There is no gradebook for this ID");
        }

        const pupilArray = [];

        for (const i of gradebookObj.records) {
            const thisPupil = this.group.pupilMap.get(i.pupilId);
            const thisTeacher = this.teacher.teacherMap.get(i.teacherId);
            const thisLMS = this.lms.subjMap.get(i.subjectId);

            if ( (thisPupil === undefined) || (thisTeacher === undefined) || (thisLMS === undefined) ) {
                throw Error ("Wrong!");
            }

            readObj.name = thisPupil.name.first + " " + thisPupil.name.last;

            recordTemplate.teacher = thisTeacher.name.first + " " + thisTeacher.name.last;
            recordTemplate.subject = thisLMS.title;

            recordTemplate.lesson = i.lesson;
            recordTemplate.mark = i.mark;

            readObj.records.push(recordTemplate);

            pupilArray.push(readObj);
        }

        return pupilArray;
    }

}
