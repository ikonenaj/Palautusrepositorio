import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ course }: { course: CoursePart }) => {
    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <i>{course.description}</i>
                </div>
            );
        case "group":
            return (
                <div>
                    project exercises {course.groupProjectCount}
                </div>
            );
        case "background":
            return (
                <div>
                    <i>{course.description}</i><br/>
                    {course.backgroundMaterial}
                </div>
            );
        case "special":
            return (
                <div>
                    <i>{course.description}</i><br/>
                    required skills: {course.requirements.join(', ')}
                </div>
            )
        default:
            return assertNever(course);
    }
};

export default Part;