import React from "react";

const PersonForm = ({ addPerson, data }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name：<input value={data.newName} onChange={data.handleNameChange} /><br/>
        Number：<input value={data.newNumber} onChange={data.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
