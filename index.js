const express = require('express')
const app = express()

let persons = [
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    },
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 5
    },
    {
        name: "asdasd",
        number: "5",
        id: 6
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!</h1>')
})

app.get('/info', (req, res) => {
    res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p> <p>' + new Date() + '</p>' )
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id )

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)