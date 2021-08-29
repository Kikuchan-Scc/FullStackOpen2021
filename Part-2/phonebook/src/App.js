import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import personServer from "./services/restCountriesBook";
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [filterPersons, setFilterPersons] = useState(persons);

  useEffect(() => {
    personServer.getAll().then((initiaPerson) => {
      setPersons(initiaPerson);
    });
  });

  const addPerson = (e) => {
    e.preventDefault();
    const personArray = persons.map(e => e.name);
    const personObject = {
      name: newName,
      number: newNumber,
    };
    //如果personArray
    if (personArray.includes(`${personObject.name}`)) {       
      //名字已存在 
      const oldPerson = persons.filter(e => e.name === newName); 
      const _id = oldPerson.map(e => e.id)[0]
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        personServer.update(_id, personObject).then((returnPerson) => {
          setPersons(persons.map(person =>
            person.id === returnPerson.id ? returnPerson : person))
          setMessage({
            text: `Edited ${returnPerson.name}`,
            type: "success",
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage({
            text: error.response.data.error,
            type: "error"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        setNewName('')
        setNewNumber('')
      }
    } else {
      personServer
        .create(personObject).then((returnPerson) => {
          setPersons(persons.concat(returnPerson))
          setMessage({
            text: `Added ${returnPerson.name}`,
            type: 'success',
          })
          setTimeout(() => {
            setMessage(null)
          },3000)
        })
        .catch(error => {
          setMessage({
            text: error.response.data.error,
            type: "error"
          })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        setNewName('')
        setNewNumber('')
    }
  };

  

  const handleFilterChange = (e) => {     //筛选人员
    setFilter(e.target.value);
    setFilterPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  const handleNameChange = (e) => {     //控制名字
    setNewName(e.target.value);
    console.log(e.target.value);
  };

  const handleNumberChange = (e) => {     //控制电话号码
    setNewNumber(e.target.value);
    console.log(e.target.value);
  };

  const data = {    //传入PersonForm
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={data} />
      <h2>Number</h2>
      {filter === "" ? (
        <Persons
          filterPerson={persons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      ) : (
        <Persons
          filterPerson={filterPersons}
          setPersons={setPersons}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default App;
