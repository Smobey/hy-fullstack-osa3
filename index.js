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
    res.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)