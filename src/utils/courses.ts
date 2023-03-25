const courses = {
  TDT4900: [{ label: "General questions", value: "general" }],
  /*
  IDATT2104: [{ label: "General questions", value: "general" }],
  DCST1007: [{ label: "Classes", value: "classes" }],*/
};

const getSubjects = () => {
  let subjects = [];
  Object.keys(courses).forEach((key) => {
    for (let subject of courses[key]) {
      if (subject !== undefined) subjects.push(subject);
    }
  });
  return subjects;
};

export { courses, getSubjects };
