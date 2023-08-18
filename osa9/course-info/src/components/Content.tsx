import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map(course =>
                <div key={course.name}>
                    <p>
                        <strong>{course.name} {course.exerciseCount}</strong><br/>
                        <Part course={course} />
                    </p>
                </div>
            )}
        </div>
    );
};

export default Content;