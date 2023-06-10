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
      <h1>
        {course.name}
      </h1>
      {course.parts.map(part => 
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
        )}
      <b>
        total of {total()} exercises
      </b>
    </div>
    
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App