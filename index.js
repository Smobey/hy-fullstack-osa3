const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const static = require('static')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

app.use(morgan(':method :url :req-body :status :res[content-length] - :response-time ms'))
morgan.token('req-body', function getPoop(req) {
    return JSON.stringify(req.body);
});

const mongoose_url = 'mongodb://smobey:x@ds229438.mlab.com:29438/puhelinluettelo-db'
mongoose.connect(mongoose_url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
})

const formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
  }

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
        res.json(persons.map(formatPerson))
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