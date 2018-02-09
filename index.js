const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const static = require('static')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

app.use(morgan(':method :url :req-body :status :res[content-length] - :response-time ms'))
morgan.token('req-body', function getPoop(req) {
    return JSON.stringify(req.body);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!</h1>')
})

app.get('/info', (req, res) => {
    res.send('<p>puhelinluettelossa ' + persons.length + ' henkilön tiedot</p> <p>' + new Date() + '</p>' )
})
  
app.get('/api/persons', (req, res) => {
    Person
    .find({})
    .then(persons => {
        res.json(persons.map(Person.format))
    })
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
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({error: 'content missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
    .save()
    .then(savedPerson => {
        res.json(Person.format(savedPerson))
    })
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