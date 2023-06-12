import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import nameService from "./services/names";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    nameService
      .getAll()
      .then(names => {
        setPersons(names)
      })
  }, []);

  const addNumber = (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    };
    const obj = {
      name: newName,
      number: newNumber,
    };

    nameService
      .create(obj)
      .then(name => {
        setPersons(persons.concat(name));
        setNewName('');
        setNewNumber('');
      })
  };

  const deleteName = (obj) => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      nameService.deleteName(obj.id);
      setPersons(persons.filter(person => person.id !== obj.id));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h2>Add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons deleteName={deleteName} searchName={searchName} persons={persons} />
    </div>
  );

};

export default App