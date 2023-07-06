import { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import Notification from './components/Notification';
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import nameService from "./services/names";

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {
    nameService
      .getAll()
      .then(names => {
        setPersons(names)
      })
  }, []);

  const addNumber = async (event) => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName);
        const newObj = {...person, number: newNumber};
        nameService.updateNumber(newObj.id, newObj)
          .catch(error => {
            setMessage(`Information of ${person.name} has already been removed from server`);
            setAction("error");

            setTimeout(() => {
              setMessage(null);
              setAction(null);
            }, 5000);
            return;
          })
        setPersons(persons.map(person => person.name !== newName ? person : newObj));
        setNewName('');
        setNewNumber('');
        setMessage(`Replaced ${newObj.name}'s number to ${newObj.number}`);
        setAction("edit");

        setTimeout(() => {
          setMessage(null);
          setAction(null);
        }, 5000);
      }
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
      .catch(error => {
        console.log(error);
        setMessage(error.response.data);
        setAction("error");

        setTimeout(() => {
          setMessage(null);
          setAction(null);
        }, 5000);
      })

    setMessage(`Added ${obj.name}`);
    setAction("add");

    setTimeout(() => {
      setMessage(null);
      setAction(null);
    }, 5000);

  };

  const deleteName = (obj) => {
    if (window.confirm(`Delete ${obj.name}?`)) {
      nameService.deleteName(obj.id);
      setPersons(persons.filter(person => person.id !== obj.id));
      setMessage(`Removed ${obj.name}`);
      setAction("delete");

      setTimeout(() => {
        setMessage(null);
        setAction(null);
      }, 5000);
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
      <Notification message={message} action={action} />
      <Filter searchName={searchName} handleSearchName={handleSearchName} />
      <h2>Add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons deleteName={deleteName} searchName={searchName} persons={persons} />
    </div>
  );

};

export default App