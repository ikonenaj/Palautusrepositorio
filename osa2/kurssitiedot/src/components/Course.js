const Course = ({course}) => {

    const total = () => {
      const exercises = course.parts.map(part => part.exercises);
      return exercises.reduce(
        (sum, current) => sum + current,
        0
      );
    };
  
    return (
      <div>
        <h2>
          {course.name}
        </h2>
        {course.parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
          )}
        <b>
          total of {total()} exercises
        </b>
      </div>
    );
  };

export default Course