import {
    GradebooksModel,
    GroupsModel,
    LMSModel,
    PupilsModel,
    SubjectsModel,
    TeachersModel,
} from "./school/index";

(async () => {

    /* Subject */

    const history = new SubjectsModel({
        lessons: 24,
        title: "History",
    });

    const history1 = new SubjectsModel({
        description: "Lorem ipsum dor sit amet.",
        lessons: 24,
        title: "History 1",
    });

    /* LMS */

    const lms = new LMSModel();

    await lms.add(history);

    await lms.add(history1);

    // await lms.remove(history1);

    // (async () => {
    //     const result = await lms.readAll();
    //     console.log(result);
    // })();

    // (async () => {
    //     const result = await lms.verify(history);
    //     console.log(result);
    // })();

    // (async () => {
    //     lms.update(history, {
    //         lessons: 360,
    //         description: 'History 0',
    //     });
    // })();

    // (async () => {
    //     const result = await lms.readAll();
    //     console.log(result);
    // })();

    /* Teacher */

    const data = {
        dateOfBirth: "1983-09-22", // format date
        description: "A great lad.",
        emails: [
            {
                email: "jdoe@example.com",
                primary: true,
            },
        ],
        image: "img",
        name: {
            first: "John",
            last: "Doe",
        },
        phones: [
            {
                phone: "+995 569 993 390",
                primary: true,
            },
        ],
        sex: "male", // male or female
        subjects: [
            {
                subject: "History",
            },
        ],
    };

    const teachers = new TeachersModel();

    let teacherId: string = "";

    teacherId = await teachers.add(data);

    await console.log(teachers.read(teacherId));

    await teachers.update(teacherId, {
        dateOfBirth: "1983-09-22", // format date
        description: "A BAD lad.",
        emails: [
            {
                email: "jdoe@example.com",
                primary: true,
            },
        ],
        image: "img",
        name: {
            first: "LOIEIOJ",
            last: "Doe",
        },
        phones: [
            {
                phone: "+995 569 993 390",
                primary: true,
            },
        ],
        sex: "male", // male or female
        subjects: [
            {
                subject: "History",
            },
        ],
    });

    await console.log("Updated teacher:");
    await console.log(teachers.read(teacherId));

    /* Pupil */

    const pupilData = {
      dateOfBirth: "2013-07-30", // format date
      description: "A splendid player",
      image: "lol.jpg",
      name: {
        first: "Rob",
        last: "Locks",
      },
      phones: [
        {
          phone: "+995 543 88 02 13",
          primary: false,
        },
      ],
      sex: "male", // male OR female
    };

    const pupils = new PupilsModel();

    const pupilId = await pupils.add(pupilData);

    console.log(await pupils.read(pupilId));

    const updatedProfile = {
      dateOfBirth: "2016-07-31", // format date
      description: "A terribad player",
      image: "meh.jpg",
      name: {
        first: "Mane",
        last: "Kraft",
      },
      phones: [
        {
          phone: "+995 556 84 06 55",
          primary: true,
        },
      ],
      sex: "female", // male OR female
    };

    await pupils.update(pupilId, updatedProfile);

    console.log("Updated pupil:");
    console.log(await pupils.read(pupilId));

    // await pupils.remove(pupilId)

    /* Group */

    const room = 236;
    const groups = new GroupsModel();

    const groupId = await groups.add(room);

    console.log(await pupils.read(pupilId));

    await groups.addPupil(groupId, pupils.read(pupilId));

    await groups.update(groupId, {
      room: 237,
    });

    console.log("GROUP TEST");
    console.log(await groups.read(groupId));

    console.log(await groups.readAll());

    // groups.removePupil(groupId, pupilId);

    /* Gradebook */

    const gradebooks = new GradebooksModel(groups, teachers, lms);

    const level = 1;
    const gradebookId = await gradebooks.add(level, groupId);

    const record = {
      lesson: 1,
      mark: 9,
      pupilId,
      subjectId: history.id,
      teacherId,
    };

    await gradebooks.addRecord(gradebookId, record);

    const rob = await gradebooks.read(gradebookId, pupilId);

    console.log(rob);

    const students = await gradebooks.readAll(gradebookId);

    console.log(await students);

    // gradebooks.clear();

})();
