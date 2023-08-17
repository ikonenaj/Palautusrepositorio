interface courseParts {
    name: string;
    exerciseCount: number;
}

const Total = ({ courses }: { courses: courseParts[] }) => {
    return (
      <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
}

export default Total;