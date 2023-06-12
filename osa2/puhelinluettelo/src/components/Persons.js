import Button from "./Button";

const Persons = ({ deleteName, searchName, persons }) => {
    return (
        persons.map((person) => {
            if (person.name.toLowerCase().includes(searchName.toLowerCase())) {
              return (
                <div key={person.name}>
                  {person.name} {person.number} <Button handleClick={() => deleteName(person)} text={"delete"} />
                </div>
              );
            } else {
              return '';
            }
            }
        )
    )
};

export default Persons;