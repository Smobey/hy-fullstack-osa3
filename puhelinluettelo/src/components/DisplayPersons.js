import React from 'react'

const DisplayPersons = (props) => {
  const personsToShow = props.persons.filter(person => person.name.toLowerCase().startsWith(props.nameFilter.toLowerCase()))

  return(personsToShow.map(person => <div key={person.id}>
    {person.name} - {person.number} - <button onClick={() => props.onDeleteClick(person.id)}>poista</button>
    </div>))
}

export default DisplayPersons