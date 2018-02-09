const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(morgan(':method :url :req-body :status :res[content-length] - :response-time ms'))
app.use(cors())

morgan.token('req-body', function getPoop(req) {
    return JSON.stringify(req.body);
});

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
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    const name = person.name
    const randId = Math.floor(Math.random() * Math.floor(99999))

    if (!person.name || !person.number) {
        return res.status(400).json({error: 'content missing'})
    }

    if (persons.find(person => person.name === name)) {
        return res.status(400).json({error: 'name must be unique'})
    }

    person.id = randId
    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
  
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})