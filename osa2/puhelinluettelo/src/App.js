import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) ;

  const [newName, setNewName] = useState('');

  const addNumber = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    };
    const obj = {
      name: newName,
    };
    setPersons(persons.concat(obj));
    setNewName("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <input
          value={newName}
          onChange={handleNameChange}
        />
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
        )}
    </div>
  );

};

export default App