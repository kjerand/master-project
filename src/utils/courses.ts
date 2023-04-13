const courses = {
  "functional-methods": [
    { label: "filter", value: "filter" },
    { label: "reduce", value: "reduce" },
    { label: "map", value: "map" },
  ],
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
