import React from "react";
import personServer from "../services/restCountriesBook";

const Persons = ({ filterPerson, setPersons, setMessage }) => {     
  const isDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}`);
    if (result) {
      personServer
        .deleted(person.id)
        .then((response) => {
          setPersons(filterPerson.filter((item) => item !== person));   //将item移出person
          setMessage({
            text: `${person.name} has removed`,
            type: "success",
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((err) => {
          setMessage({
            text: `${person.name} was already removed from server`,
          });
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  return filterPerson.map((e) => (
    <p>
      {e.name} {e.number} <button onClick={() => isDelete(e)}>delete</button>
    </p>
  ));
};

export default Persons;
