interface courseParts {
    name: string;
    exerciseCount: number;
}

const Content = ({ courses }: { courses: courseParts[] }) => {
    return (
        <div>
            {courses.map(course =>
                <p key={course.name}>
                  {course.name} {course.exerciseCount}
                </p>
            )}
        </div>
    );
};

export default Content;