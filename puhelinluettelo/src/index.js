import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import DisplayPersons from './components/DisplayPersons'
import personService from './components/Services'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      nameFilter: '',
      notification: null
    }
  }

  displayNotification = (notification) => {
    this.setState({notification: notification})
    setTimeout(() => {
      this.setState({notification: null})
    }, 3000)
  }

  addName = (event) => {
    event.preventDefault()

    const person = {name: this.state.newName, number: this.state.newNumber}
    const duplicate = this.state.persons.map(person => person.name).indexOf(this.state.newName) !== -1

    if (!duplicate) {
      personService
        .create(person)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: ''
          })
          this.displayNotification("Henkilö lisätty")
        })
    } else {
      const dupe = this.state.persons.map(person => person).find((p) => p.name === person.name)
      personService
        .update(dupe.id, person)
        .then(response => {
          personService
            .getAll()
            .then(response => {
              this.setState({persons: response.data})
            })
            this.displayNotification("Henkilön numero vaihdettu")
        })
        .catch(error => {
          this.displayNotification("VIRHE: Henkilöä ei ole enää olemassa!")
        })
    }

  }

  deleteName = (props) => {
    personService
    .remove(props)
    .then(response => {
      personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
        this.displayNotification("Henkilö poistettu")
      })
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ nameFilter: event.target.value })
  }

  componentWillMount() {
    personService
    .getAll()
    .then(response => {
      this.setState({persons: response.data})
    })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.notification}/>
        <div>
          rajaa näytetettäviä: <input value={this.state.nameFilter} onChange={this.handleFilterChange}/>
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <DisplayPersons persons={this.state.persons} nameFilter={this.state.nameFilter} onDeleteClick={this.deleteName} />
      </div>
    )
  }
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)