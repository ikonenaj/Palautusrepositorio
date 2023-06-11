const Persons = ({ searchName, persons }) => {
    return (
        persons.map((person) => {
            if (person.name.toLowerCase().includes(searchName.toLowerCase())) {
              return (<p key={person.name}>{person.name} {person.number}</p>);
            } else {
              return '';
            }
            }
        )
    )
};

export default Persons;