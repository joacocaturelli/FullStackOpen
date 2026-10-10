const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} /> 
      ))}
    </div>
  )
}

const Total = ({ parts }) => {

  const total = parts.reduce(
    (acc, part) => acc += part.exercises, 0
  ) 

  return (
    <strong>
      Total of {total} exercises
    </strong>
  )
}

const Course = ({ courses }) => {
  return (
    courses.map((course) => (
      <div key={course.id}>
        <Header course={course}/>
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    ))
  )
}

export default Course